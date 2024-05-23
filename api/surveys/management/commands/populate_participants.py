import csv
from django.core.management.base import BaseCommand
from surveys.models import Participant


class Command(BaseCommand):
    help = "Populate participants"

    def add_arguments(self, parser):
        parser.add_argument("csv_file", type=str, help="The CSV file to import")

    def handle(self, *args, **kwargs):
        if Participant.objects.count():
            return

        csv_file = kwargs["csv_file"]

        field_mapping = {
            "Gender": "gender",
            "Age": "age",
            "Region": "region",
            "What is the highest level of education you have completed?": "education",
            "What is your current relationship status?": "relationship_status",
            "What's your main occupation?": "occupation",
            "What is your current household income?": "household_income",
            "In which social class would you consider yourself? ": "social_class",
            "How often do you smoke cigarettes?": "smoking_frequency",
            "Do you pay back the entirety of your credit card debt every month?": "credit_card_debt",
        }

        with open(csv_file, newline="", encoding="utf-8") as file:
            reader = csv.DictReader(file)
            for row in reader:
                survey_data = {}
                for csv_field, model_field in field_mapping.items():
                    survey_data[model_field] = row[csv_field]
                Participant.objects.create(**survey_data)
                self.stdout.write(
                    self.style.SUCCESS(
                        f"Successfully added Participant for: {row['Region']}"
                    )
                )
