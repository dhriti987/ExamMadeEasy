from rest_framework import serializers
from .models import Student, Professor

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        exclude = ['user']

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Professor
        exclude = ['user']