from rest_framework import generics
from rest_framework.response import Response

from .models import AnswerSheet, Exam, MarksObtained, StudentAnswersheet

from .serializers import AnswerSheetSerializer, ExamSerializer, MarksObtainedSerializer, StudentAnswerSheetSerializer

class AnswerSheetAPIView(generics.ListCreateAPIView):
    queryset = AnswerSheet.objects.all()
    serializer_class = AnswerSheetSerializer
    def post(self, request, *args, **kwargs):
        ans_sheet = []
        for i in range(int(request.GET.get('n'))):
            serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            ans_sheet.append(serializer.data)
        return Response(ans_sheet)


class StudentAnswersheetAPIview(generics.ListCreateAPIView):
    queryset = StudentAnswersheet.objects.all()
    serializer_class = StudentAnswerSheetSerializer

class ExamAPIView(generics.ListCreateAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class MarksObtainedAPIView(generics.ListCreateAPIView):
    queryset = MarksObtained.objects.all()
    serializer_class = MarksObtainedSerializer
