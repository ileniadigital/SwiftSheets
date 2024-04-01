# from django.contrib.auth.models import User
from .models import SystemUser, Timesheet, Event
from rest_framework import serializers

#SystemUsers
class SystemUserSerializer(serializers.ModelSerializer):
  class Meta:
    model = SystemUser
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = SystemUser.objects.create_user(**validated_data)
    return user

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
                    