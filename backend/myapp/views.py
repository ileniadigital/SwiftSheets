from django.shortcuts import render
# from django.contrib.auth.models import User
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics, viewsets, permissions
from .models import SystemUser, Timesheet, Event
from .serializers import SystemUserSerializer, TimesheetSerializer, EventSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

class CreateUserView(generics.CreateAPIView):
  queryset = SystemUser.objects.all()
  serializer_class = SystemUserSerializer
  permission_classes =  [AllowAny]


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
    