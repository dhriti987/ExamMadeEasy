from django.contrib import admin
from .models import AnswerSheet, Exam, MarksObtained, StudentAnswersheet
# Register your models here.

admin.site.register(Exam)
admin.site.register(AnswerSheet)
admin.site.register(StudentAnswersheet)
admin.site.register(MarksObtained)