from django.contrib import admin

from users.models import CustomUser, Student, Professor

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Student)
admin.site.register(Professor)