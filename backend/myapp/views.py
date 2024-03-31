# from django.contrib.auth.models import User
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

#a new view to check the events given a timesheet selected
# class TimesheetEventsView(viewsets.ModelViewSet):
#     queryset = Timesheet.objects.all()
#     serializer_class = TimesheetSerializer

#     @action(detail=True, methods=['get'])
#     def events(self, request, pk=None):
#         timesheet = self.get_object()
#         events = Event.objects.filter(timesheet=timesheet)
#         serializer = EventSerializer(events, many=True)
#         return Response(serializer.data)
    
#     def timesheet_events(request):
#         timesheets = Timesheet.objects.all()
#         return render(request, 'timesheet_events.html', {'timesheets': timesheets})
    
#     def get_timesheet_events(request, timesheet_id):
#         timesheet = Timesheet.objects.get(id=timesheet_id)
#         events = Event.objects.filter(timesheet=timesheet)
#         event_texts = [event.__str__() for event in events]
#         return JsonResponse(event_texts, safe=False)
    
#select timesheet to view the events for it
class TimesheetEventView(APIView):
    renderer_classes = [TemplateHTMLRenderer]
    template_name = 'timesheet_events.html'

    def get(self, request):
        timesheets = Timesheet.objects.all()
        return render(request, 'timesheet_events.html', {'timesheets': timesheets})

    def post(self, request):
        timesheet_id = request.POST.get('timesheet_id')
        timesheet = Timesheet.objects.get(pk=timesheet_id)
        events = timesheet.events.all()  # Retrieve all events related to the selected timesheet
        return render(request, 'timesheet_events.html', {'timesheets': Timesheet.objects.all(), 'timesheet': timesheet, 'events': events})

#select the user to check the timesheets for it.
class UserTimesheetView(APIView):
    def get(self, request):
        users = SystemUser.objects.all()
        return render(request, 'user_timesheets.html', {'users': users})

    def post(self, request):
        user_id = request.POST.get('user_id')
        user = SystemUser.objects.get(pk=user_id)
        timesheets = user.timesheets.all()  # Retrieve all timesheets related to the selected user
        return render(request, 'user_timesheets.html', {'users': SystemUser.objects.all(), 'user': user, 'timesheets': timesheets})