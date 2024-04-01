from django.shortcuts import render
# from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import SystemUser, Timesheet, Event
from .serializers import SystemUserSerializer, TimesheetSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
  queryset = SystemUser.objects.all()
  serializer_class = SystemUserSerializer
  permission_classes = [AllowAny]


class TimesheetCreate(generics.CreateAPIView):
    def post(self, request, format=None):
        serializer = TimesheetSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TimesheetListView(generics.ListAPIView):
    # queryset = Timesheet.objects.all()
    serializer_class = TimesheetSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        # user = self.request.user
        return  Timesheet.objects.filter(review_status='Pending')

class TimesheetDelete(generics.DestroyAPIView):
    serializer_class = TimesheetSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        return  Timesheet.objects.filter(owner=user)
    