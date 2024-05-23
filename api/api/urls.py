from django.contrib import admin
from django.urls import path

from surveys.views import (
    QuestionListCreate,
    QuestionRetrieveUpdateDestroy,
    QuestionResponsesList,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("questions/", QuestionListCreate.as_view(), name="question-list-create"),
    path(
        "questions/<int:pk>/",
        QuestionRetrieveUpdateDestroy.as_view(),
        name="question-detail",
    ),
    path(
        "questions/<int:question_id>/responses/",
        QuestionResponsesList.as_view(),
        name="question-responses-list",
    ),
]
