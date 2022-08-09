import uuid
from django.db import models

from users.models import Professor, Student

# Create your models here.

class Exam(models.Model):
    name = models.CharField(max_length=30)
    subjext = models.CharField(max_length=30)
    date = models.DateField()

class AnswerSheet(models.Model):
    qr_code = models.UUIDField(unique=True,default=uuid.uuid4)
    
    def __str__(self) -> str:
        return str(self.id)

class StudentAnswersheet(models.Model):
    student = models.ForeignKey(Student,on_delete=models.CASCADE)
    answersheet = models.OneToOneField(AnswerSheet, on_delete=models.CASCADE)
    exam = models.ForeignKey(Exam,on_delete=models.CASCADE)
    invigilator = models.ForeignKey(Professor,on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add = True)

    def __str__(self) -> str:
        return f'{self.student.__str__()}   AnsSheet:{self.answersheet.__str__()}'

class MarksObtained(models.Model):
    answersheet = models.ForeignKey(StudentAnswersheet, on_delete=models.CASCADE, related_name='evaluation')
    marks = models.SmallIntegerField()
    examiner = models.ForeignKey(Professor,on_delete=models.CASCADE)
    checked_at = models.DateTimeField(auto_now_add = True)
    sent = models.BooleanField(default=False)