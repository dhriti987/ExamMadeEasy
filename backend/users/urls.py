from django.urls import path
from users.views import StudentFilterAPIView
from users.views import ProfessorDetailsAPI, ProfessorUpdateDeleteAPIView
from users.views import StudentUpdateDeleteAPIView

from users.views import StudentDetailsAPI

urlpatterns = [
    path('student/',StudentDetailsAPI.as_view()),
    path('student/<uuid:pk>',StudentUpdateDeleteAPIView.as_view()),
    path('professor/',ProfessorDetailsAPI.as_view()),
    path('professor/<int:user>',ProfessorUpdateDeleteAPIView.as_view()),
    path('filter-student/',StudentFilterAPIView.as_view()),
]