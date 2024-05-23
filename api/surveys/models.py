from django.db import models


class Question(models.Model):
    text = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    yes_percentage = models.FloatField(default=0)
    no_percentage = models.FloatField(default=0)

    def __str__(self):
        return self.text


class Participant(models.Model):
    gender = models.CharField(
        max_length=10, help_text="Select your gender (e.g., Male, Female, Other)"
    )
    age = models.PositiveIntegerField(help_text="Enter your age in years")
    region = models.CharField(
        max_length=100, help_text="Enter the region where you reside"
    )
    education = models.CharField(
        max_length=100,
        help_text="What is the highest level of education you have completed?",
    )
    relationship_status = models.CharField(
        max_length=100, help_text="What is your current relationship status?"
    )
    occupation = models.CharField(
        max_length=100, help_text="What's your main occupation?"
    )
    household_income = models.CharField(
        max_length=100, help_text="What is your current household income?"
    )
    social_class = models.CharField(
        max_length=100, help_text="In which social class would you consider yourself?"
    )
    smoking_frequency = models.CharField(
        max_length=100, help_text="How often do you smoke cigarettes?"
    )
    credit_card_debt = models.CharField(
        max_length=100,
        help_text="Do you pay back the entirety of your credit card debt every month?",
    )

    def __str__(self):
        return f"Participant {self.id}"

    def character(self):
        fields = self._meta.get_fields()
        field_values = []
        for field in fields:
            if hasattr(field, "help_text") and field.help_text:
                value = getattr(self, field.name)
                field_values.append(f"{field.help_text}: {value}")
        return ", ".join(field_values)


class Response(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE)
    answer = models.TextField()
    answered_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("question", "participant")

    def __str__(self):
        return f"Response by Participant {self.participant.id} to Question {self.question.id}"
