from rest_framework import serializers

from examination.models import AnswerSheet, MarksObtained, StudentAnswersheet, Exam
from users.models import Student 

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'
    
class AnswerSheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnswerSheet
        fields = '__all__'

class StudentAnswerSheetSerializer(serializers.ModelSerializer):
    student = serializers.SlugRelatedField(slug_field='id',queryset=Student.objects.all())
    answersheet = serializers.SlugRelatedField(slug_field='qr_code',queryset=AnswerSheet.objects.all())
    class Meta:
        model = StudentAnswersheet
        fields = "__all__"

class MarksObtainedSerializer(serializers.ModelSerializer):
    answersheet = serializers.UUIDField(source="answersheet.answersheet.qr_code")

    class Meta:
        model = MarksObtained
        fields = "__all__"

    def create(self, validated_data):
        ans_sheet = validated_data['answersheet']['answersheet']["qr_code"]
        ans_sheet = AnswerSheet.objects.get(qr_code = ans_sheet)
        obj = MarksObtained.objects.create(
            answersheet=StudentAnswersheet.objects.get(
                answersheet=ans_sheet),
            marks=validated_data['marks'],
            examiner=validated_data["examiner"]
        )
        obj.save()
        return obj