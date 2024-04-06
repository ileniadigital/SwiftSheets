# from tokenize import Comment
from .models import  SystemUser, Timesheet, Event, Comment, Notification
from rest_framework import serializers # type: ignore
from django.contrib.auth import authenticate, get_user_model # type: ignore
from django.core.exceptions import ValidationError # type: ignore

UserModel = get_user_model()

class SystemUserLoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField()
	
	def check_user(self, clean_data):
		user = authenticate(username=clean_data['email'], password=clean_data['password'])
		if not user:
			raise ValidationError('user not found')
		return user
    
class SystemUserSerializer(serializers.ModelSerializer):
	class Meta:
		model = UserModel
		fields = ('email', 'username')

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
                    