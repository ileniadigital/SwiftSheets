# from django.contrib.auth.models import User
from tokenize import Comment
from .models import Notification, SystemUser, Timesheet, Event
from rest_framework import serializers

#SystemUsers
#timesheets
class SystemUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemUser
        fields = '__all__'

#timesheets
class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = '__all__'

#Event
class EventSerializer(serializers.ModelSerializer):
    timesheet = TimesheetSerializer(read_only=True)

    class Meta:
        model = Event
        fields = '__all__'
                    
class CommentSerializer(serializers.ModelSerializer):
    # event = EventSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'
                    
class NotificationSerializer(serializers.ModelSerializer):
    # timesheet = TimesheetSerializer(read_only=True)
    # timesheet = EventSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
                    