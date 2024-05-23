from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Question


class QuestionAPITestCase(APITestCase):
    def setUp(self):
        self.question = Question.objects.create(text="What is the capital of France?")
        self.list_create_url = reverse("question-list-create")
        self.detail_url = reverse("question-detail", kwargs={"pk": self.question.id})

    def test_create_question(self):
        data = {"text": "What is the capital of Spain?"}
        response = self.client.post(self.list_create_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Question.objects.count(), 2)
        self.assertEqual(
            Question.objects.latest("id").text, "What is the capital of Spain?"
        )

    def test_read_questions(self):
        response = self.client.get(self.list_create_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["text"], "What is the capital of France?")

    def test_read_single_question(self):
        response = self.client.get(self.detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["text"], "What is the capital of France?")

    def test_update_question(self):
        data = {"text": "What is the capital of Germany?"}
        response = self.client.put(self.detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.question.refresh_from_db()
        self.assertEqual(self.question.text, "What is the capital of Germany?")

    def test_partial_update_question(self):
        data = {"text": "What is the capital of Italy?"}
        response = self.client.patch(self.detail_url, data, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.question.refresh_from_db()
        self.assertEqual(self.question.text, "What is the capital of Italy?")

    def test_delete_question(self):
        response = self.client.delete(self.detail_url, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Question.objects.count(), 0)
