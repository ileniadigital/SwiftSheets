# Generated by Django 5.0.4 on 2024-04-10 19:00

import datetime
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='SystemUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.EmailField(max_length=254, null=True, unique=True)),
                ('password', models.CharField(default='pass', max_length=128)),
                ('user_type', models.CharField(choices=[('Consultant', 'Consultant'), ('LineManager', 'LineManager'), ('FinanceTeamMember', 'FinanceTeamMember'), ('Administrator', 'Administrator')], default='Consultant', max_length=20)),
                ('firstname', models.CharField(blank=True, max_length=100)),
                ('lastname', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('notification_type', models.CharField(choices=[('Approved_Timesheet', 'Approved Timesheet'), ('Rejected_Timesheet', 'Rejected Timesheet'), ('Submitted', 'Submitted'), ('Reminder', 'Reminder'), ('Revoked', 'Revoked'), ('Processed_Payment', 'Processed Payment'), ('Rejected_Payment', 'Rejected Payment')], default='Submitted', max_length=32)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='notifications', to='myapp.systemuser')),
            ],
        ),
        migrations.CreateModel(
            name='Timesheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateField(default=datetime.date(2024, 4, 8))),
                ('end_date', models.DateField(default=datetime.date(2024, 4, 14))),
                ('submission_date', models.DateField(auto_now_add=True, null=True)),
                ('submission_time', models.DateTimeField(auto_now_add=True)),
                ('review_status', models.CharField(choices=[('Approved', 'Approved'), ('Rejected', 'Rejected'), ('Pending', 'Pending')], default='Pending', max_length=20)),
                ('payment_status', models.CharField(choices=[('Approved', 'Approved'), ('Rejected', 'Rejected'), ('Pending', 'Pending')], default='Pending', max_length=20)),
                ('auto_submit', models.BooleanField(default=False)),
                ('completion_reminder', models.DateTimeField(blank=True, null=True)),
                ('last_edited', models.DateTimeField(blank=True, null=True)),
                ('last_reviewed', models.DateTimeField(blank=True, null=True)),
                ('is_submitted', models.BooleanField(default=False)),
                ('user', models.ForeignKey(limit_choices_to={'user_type': 'Consultant'}, on_delete=django.db.models.deletion.CASCADE, related_name='timesheets', to='myapp.systemuser')),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.CharField(default='2024-04-10', max_length=30)),
                ('start_time', models.TimeField(default=datetime.time(19, 0, 19, 773686))),
                ('end_time', models.TimeField(default=datetime.time(19, 0, 19, 773686))),
                ('duration', models.FloatField(default=0.0)),
                ('name', models.CharField(default='Event', max_length=255)),
                ('type', models.CharField(choices=[('Overtime', 'Overtime'), ('Holiday', 'Holiday'), ('Sick', 'Sick'), ('Normal', 'Normal')], default='Normal', max_length=20)),
                ('category', models.CharField(choices=[('Planning', 'Planning'), ('Meeting', 'Meeting'), ('Project', 'Project')], default='Planning', max_length=20)),
                ('is_recurring', models.BooleanField(default=False)),
                ('note', models.TextField(blank=True, default='')),
                ('timesheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='events', to='myapp.timesheet')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment_text', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('timesheet', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='myapp.timesheet')),
            ],
        ),
    ]
