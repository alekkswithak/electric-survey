from rest_framework import serializers
from surveys.models import Question
from .models import Response, Participant


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant
        fields = "__all__"


class ResponseSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)

    class Meta:
        model = Response
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        participant_data = data.pop("participant")

        for key, value in participant_data.items():
            data[key] = value

        return data


class QuestionSerializer(serializers.ModelSerializer):
    num_responses = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = [
            "id",
            "text",
            "created_at",
            "yes_percentage",
            "no_percentage",
            "num_responses",
        ]

    def get_num_responses(self, obj):
        return obj.response_set.count()
