# Import necessary modules and classes
from django.contrib.auth.models import User
from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.utils import timezone
from django.urls import reverse
from rest_framework.response import Response
from rest_framework import generics, viewsets, permissions, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.renderers import TemplateHTMLRenderer
# from rest_framework.decorators import action
from rest_framework.views import APIView
from .models import SystemUser, Timesheet, Event, Comment, Notification
from .serializers import SystemUserSerializer, TimesheetSerializer, EventSerializer, CommentSerializer, NotificationSerializer 

# View to create a new user
class CreateUserView(generics.CreateAPIView):
    queryset = SystemUser.objects.all()
    serializer_class = SystemUserSerializer
    permission_classes = [AllowAny]

# ViewSet for managing system users
class SystemUserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = SystemUser.objects.all()
    serializer_class = SystemUserSerializer

    # Retrieve list of all users
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Create a new user
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Retrieve a specific user
    def retrieve(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(system_user)
        return Response(serializer.data)

    # Update a user
    def update(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(system_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Delete a user
    def destroy(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        system_user.delete()
        return Response(status=204)
    
# ViewSet for managing timesheets
class TimesheetViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer

    # Retrieve list of all timesheets
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Create a new timesheet
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Retrieve a specific timesheet
    def retrieve(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        serializer = self.serializer_class(timesheet)
        return Response(serializer.data)
    
    def get_queryset(self):
        queryset = super().get_queryset()
        user_email = self.request.query_params.get('user_email')
        if user_email:
            queryset = queryset.filter(user__email=user_email)
        return queryset

    # Update a timesheet
    def update(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        serializer = self.serializer_class(timesheet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
    

    # Delete a timesheet
    def destroy(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        timesheet.delete()
        return Response(status=204)

# ViewSet for managing events
class EventViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    # Retrieve list of all events
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    # Create a new event
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
    # def post(self, request, format=None):
    #     serializer = EventSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Retrieve a specific event
    def retrieve(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event)
        return Response(serializer.data)

    # Update an event
    def update(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Delete an event
    def destroy(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        event.delete()
        return Response(status=204)
    
# ViewSet for managing comments
class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    # Retrieve list of all comments
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Create a new comment
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Retrieve a specific comment
    def retrieve(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        serializer = self.serializer_class(comment)
        return Response(serializer.data)

    # Update a comment
    def update(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        serializer = self.serializer_class(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Delete a comment
    def destroy(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        comment.delete()
        return Response(status=204)
    
# ViewSet for managing notifications
class NotificationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    # Retrieve list of all notifications
    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Create a new notification
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Retrieve a specific notification
    def retrieve(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        serializer = self.serializer_class(notification)
        return Response(serializer.data)

    # Update a notification
    def update(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        serializer = self.serializer_class(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Delete a notification
    def destroy(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        notification.delete()
        return Response(status=204)

# View to display events related to a selected timesheet
class TimesheetEventView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'timesheet_events.html'

    # Display timesheets
    def get(self, request):
        timesheets = Timesheet.objects.all()
        return render(request, 'timesheet_events.html', {'timesheets': timesheets})

    # Display events related to a selected timesheet
    def post(self, request):
        timesheet_id = request.POST.get('timesheet_id')
        timesheet = Timesheet.objects.get(pk=timesheet_id)
        events = timesheet.events.all()  # Retrieve all events related to the selected timesheet
        return render(request, 'timesheet_events.html', {'timesheets': Timesheet.objects.all(), 'timesheet': timesheet, 'events': events})

# View to display timesheets related to a selected user
class UserTimesheetView(APIView):
    def get(self, request):
        users = SystemUser.objects.all()
        return render(request, 'user_timesheets.html', {'users': users})

    def post(self, request):
        user_id = request.POST.get('user_id')
        user = SystemUser.objects.get(pk=user_id)
        timesheets = user.timesheets.all()  # Retrieve all timesheets related to the selected user
        return render(request, 'user_timesheets.html', {'users': SystemUser.objects.all(), 'user': user, 'timesheets': timesheets})
