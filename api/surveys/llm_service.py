from django.db import transaction
from surveys.models import Participant, Response
from os import environ
import time
import groq

BATCH_SIZE = 30


def ask_llm(character: str, question) -> str:
    user_content = f"""If you pretend to be the following person ({character}). Only
    answer with one of the options: Yes, No, Don't Know. To the following question: {question}"""

    client = groq.Groq(api_key=environ.get("LLM_API_KEY"))

    for _ in range(30):
        try:
            response = client.chat.completions.create(
                messages=[
                    {
                        "role": "user",
                        "content": user_content,
                    }
                ],
                model="llama3-8b-8192",
            )
            return response.choices[0].message.content
        except groq.RateLimitError:
            print("Rate limit exceeded. Waiting for 40 seconds before retrying...")
            time.sleep(40)
        except Exception as e:
            raise e


class LLMService:
    def __init__(self, question):
        self.service = ask_llm
        self.question = question

    def call_llm(self, participant):
        character = participant.character()
        return self.service(character, self.question.text)


def update_question_percentages(question):
    total_responses = question.response_set.count()
    if total_responses == 0:
        question.yes_percentage = 0
        question.no_percentage = 0
    else:
        yes_responses = question.response_set.filter(answer__iexact="yes").count()
        no_responses = question.response_set.filter(answer__iexact="no").count()
        question.yes_percentage = (yes_responses / total_responses) * 100
        question.no_percentage = (no_responses / total_responses) * 100
    question.save()


def run_survey(question):
    try:
        service = LLMService(question)

        participants = Participant.objects.all()
        total_participants = participants.count()

        for start in range(0, total_participants, BATCH_SIZE):
            chunk = participants[start : start + BATCH_SIZE]

            responses = []
            for participant in chunk:
                response = service.call_llm(participant)
                response = Response(
                    question=question, participant=participant, answer=response
                )
                responses.append(response)
                if len(responses) >= BATCH_SIZE:
                    with transaction.atomic():
                        Response.objects.bulk_create(responses)
                    responses = []

        if responses:
            with transaction.atomic():
                Response.objects.bulk_create(responses)
    except Exception as e:
        print(e)
