from rest_framework import generics, status
from rest_framework.views import APIView
from .models import Question, Response
from .serializers import QuestionSerializer, ResponseSerializer
from surveys.llm_service import run_survey
import json
from django.http import JsonResponse
from django.urls import reverse
import urllib.request
from django.http import HttpRequest
import requests


class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        run_survey(instance)


class QuestionRetrieveUpdateDestroy(generics.RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class QuestionResponsesList(generics.ListAPIView):
    serializer_class = ResponseSerializer

    def get_queryset(self):
        question_id = self.kwargs["question_id"]
        return Response.objects.filter(question_id=question_id)
