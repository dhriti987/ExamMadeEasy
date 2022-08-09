# Generated by Django 3.2.10 on 2022-07-17 09:14

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='AnswerSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('qr_code', models.UUIDField(default=uuid.uuid4, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('subjext', models.CharField(max_length=30)),
                ('date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='StudentAnswersheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('answersheet', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='examination.answersheet')),
                ('exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='examination.exam')),
                ('invigilator', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.professor')),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.student')),
            ],
        ),
        migrations.CreateModel(
            name='MarksObtained',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('marks', models.SmallIntegerField()),
                ('checked_at', models.DateTimeField(auto_now_add=True)),
                ('sent', models.BooleanField(default=False)),
                ('answersheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='evaluation', to='examination.studentanswersheet')),
                ('examiner', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.professor')),
            ],
        ),
    ]