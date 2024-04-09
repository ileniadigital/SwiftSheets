# from django.contrib.auth.models import User
# from tokenize import Comment
from .models import SystemUser, Timesheet, Event, Comment, Notification
from rest_framework import serializers  # type: ignore

#SystemUsers
#timesheets
class SystemUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = SystemUser
        fields = '__all__'

#timesheets
class TimesheetSerializer(serializers.ModelSerializer):
    review_status= serializers.CharField(required=False)
    payment_status = serializers.CharField(required=False)
    class Meta:
        model = Timesheet
        fields = '__all__'
#Event
class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'
                    
#Comment
class CommentSerializer(serializers.ModelSerializer):
    event = EventSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = '__all__'

#Notification                  
class NotificationSerializer(serializers.ModelSerializer):
    # timesheet = TimesheetSerializer(read_only=True)
    # timesheet = EventSerializer(read_only=True)

    class Meta:
        model = Notification
        fields = '__all__'
                    