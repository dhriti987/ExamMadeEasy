from django.urls import path

from .views import AnswerSheetAPIView, ExamAPIView, MarksObtainedAPIView, StudentAnswersheetAPIview

urlpatterns = [
    path("exam/", ExamAPIView.as_view()),
    path("answersheet/",AnswerSheetAPIView.as_view()),
    path('student-sheet/', StudentAnswersheetAPIview.as_view()),
    path('marks/', MarksObtainedAPIView.as_view()),
]