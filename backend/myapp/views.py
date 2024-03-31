from django.shortcuts import render
# from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, viewsets, permissions
from .models import SystemUser, Timesheet, Event, Comment, Notification
from .serializers import SystemUserSerializer, TimesheetSerializer, EventSerializer, CommentSerializer, NotificationSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.utils import timezone

class CreateUserView(generics.CreateAPIView):
  queryset = SystemUser.objects.all()
  serializer_class = SystemUserSerializer
  permission_classes = [AllowAny]


class SystemUserViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = SystemUser.objects.all()
    serializer_class = SystemUserSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(system_user)
        return Response(serializer.data)

    def update(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(system_user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        system_user.delete()
        return Response(status=204)
    
class TimesheetViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # def list(self, request):
    #     user_email = request.query_params.get('user_email')
    #     print(f"User email: {user_email}")  # Debug print

    #     if user_email is not None:
    #         user = SystemUser.objects.filter(username=user_email).first()
    #         print(f"User: {user}")  # Debug print

    #         if user:
    #             queryset = self.queryset.filter(user=user, end_date__lt=timezone.now().date())
    #         else:
    #             queryset = self.queryset.none()  # Handle as appropriate
    #     else:
    #         queryset = self.queryset.none()

    #     serializer = self.serializer_class(queryset, many=True)
    #     return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        serializer = self.serializer_class(timesheet)
        return Response(serializer.data)

    def update(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        serializer = self.serializer_class(timesheet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        timesheet.delete()
        return Response(status=204)

class EventViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Event.objects.all()
    serializer_class = EventSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event)
        return Response(serializer.data)

    def update(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        event.delete()
        return Response(status=204)
    
class CommentViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        serializer = self.serializer_class(comment)
        return Response(serializer.data)

    def update(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        serializer = self.serializer_class(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        comment.delete()
        return Response(status=204)
    
class NotificationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer

    def list(self, request):
        queryset = self.queryset
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        serializer = self.serializer_class(notification)
        return Response(serializer.data)

    def update(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        serializer = self.serializer_class(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        notification.delete()
        return Response(status=204)