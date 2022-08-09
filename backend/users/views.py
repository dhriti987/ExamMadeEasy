from rest_framework import generics
from rest_framework.response import Response
from users.models import Professor, Student
from users.serializers import ProfessorSerializer, StudentSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response

class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'is_professor': user.is_professor,
            'is_superuser': user.is_superuser,
        })

class StudentDetailsAPI(generics.ListCreateAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class StudentUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = StudentSerializer
    queryset = Student.objects.all()

class ProfessorDetailsAPI(generics.ListCreateAPIView):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()

class ProfessorUpdateDeleteAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()
    lookup_field = 'user'

class StudentFilterAPIView(generics.GenericAPIView):
    serializer_class = StudentSerializer

    def get_queryset(self, name, _class):
        queryset = Student.objects.all()
        if name:
            queryset = queryset.filter(name__istartswith = name)
        if _class:
             queryset = queryset.filter(st_class = _class)
        return queryset
    
    def get(self, request):
        data = self.get_queryset(request.GET.get('name'), request.GET.get('class'))
        serializer_obj = self.serializer_class(data, many=True)
        return Response(serializer_obj.data)
