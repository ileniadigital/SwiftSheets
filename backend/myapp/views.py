# Import necessary modules and classes
from django.contrib.auth.models import User  # type: ignore
from django.http import HttpResponseRedirect, JsonResponse # type: ignore
from django.shortcuts import render  # type: ignore
from django.utils import timezone  # type: ignore
from django.urls import reverse  # type: ignore
from rest_framework.response import Response  # type: ignore
from rest_framework import generics, viewsets, permissions, status  # type: ignore
from rest_framework.permissions import IsAuthenticated, AllowAny  # type: ignore
from rest_framework.renderers import TemplateHTMLRenderer  # type: ignore
from rest_framework.decorators import action, api_view  # type: ignore
# from rest_framework.decorators import action
from rest_framework.views import APIView  # type: ignore
from .models import SystemUser, Timesheet, Event, Comment, Notification
from .serializers import SystemUserSerializer, TimesheetSerializer, EventSerializer, CommentSerializer, NotificationSerializer 
from django.views.decorators.http import require_POST  # type: ignore

@api_view(['POST'])
def create_timesheet(request):
    serializer = TimesheetSerializer(data=request.data)
    if serializer.is_valid():
        timesheet = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_events(request, timesheet_id):
    try:
        timesheet = Timesheet.objects.get(id=timesheet_id)
    except Timesheet.DoesNotExist:
        return Response({'error': 'Timesheet does not exist'}, status=status.HTTP_400_BAD_REQUEST)

    events_data = request.data.get('events', [])
    for event_data in events_data:
        event_data['timesheet'] = timesheet_id  # Associate event with the specified timesheet
        event_serializer = EventSerializer(data=event_data)
        if event_serializer.is_valid():
            event_serializer.save()
        else:
            return Response(event_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    return Response({'message': 'Events created successfully'}, status=status.HTTP_201_CREATED)


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
    # def list(self, request):
    #     queryset = self.queryset
    #     serializer = self.serializer_class(queryset, many=True)
    #     return Response(serializer.data)

    def partial_update(self, request, pk=None):
        system_user = self.queryset.get(pk=pk)
        serializer = self.serializer_class(system_user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def list(self, request):
        queryset = self.queryset
        email = request.query_params.get('email')
        if email is not None:
            queryset = queryset.filter(username=email)
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

    def list(self, request, *args, **kwargs):
        # Check if the query parameter is for review_status or payment_status
        review_status = request.query_params.get('review_status')
        payment_status = request.query_params.get('payment_status')

        if review_status:
            if review_status.lower() == 'all':
                queryset = Timesheet.objects.all()
            else:
                queryset = Timesheet.objects.filter(review_status=review_status.capitalize())
        elif payment_status:
            if payment_status.lower() == 'all':
                queryset = Timesheet.objects.all()
            else:
                queryset = Timesheet.objects.filter(payment_status=payment_status.capitalize())
        else:
            queryset = Timesheet.objects.all()
        
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def partial_update(self, request, pk=None):
        timesheet = self.queryset.get(pk=pk)
        serializer = self.serializer_class(timesheet, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)


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

    def partial_update(self, request, pk=None):
        event = self.queryset.get(pk=pk)
        serializer = self.serializer_class(event, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    # Retrieve list of all events
    #def list(self, request):
    #    queryset = self.queryset
    #    serializer = self.serializer_class(queryset, many=True)
    #    return Response(serializer.data)

    def list(self, request):
        timesheet_id = request.query_params.get('timesheet_id')
        
        if timesheet_id:
            try:
                timesheet = Timesheet.objects.get(id=timesheet_id)
            except Timesheet.DoesNotExist:
                return Response({'error': 'Timesheet does not exist'}, status=status.HTTP_400_BAD_REQUEST)
            
            events = timesheet.events.all()  # Assuming related_name is 'events'
        else:
            events = Event.objects.all()
        
        serializer = self.serializer_class(events, many=True)
        return Response(serializer.data)
    
    # Create a new event
    def create(self, request):
        # Extract timesheet_id from request data
        timesheet_id = request.data.get('timesheet_id')
        
        # Check if the timesheet exists
        try:
            timesheet = Timesheet.objects.get(id=timesheet_id)
        except Timesheet.DoesNotExist:
            return Response({'error': 'Timesheet does not exist'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Associate the event with the timesheet
        request.data['timesheet'] = timesheet_id
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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

    def partial_update(self, request, pk=None):
        comment = self.queryset.get(pk=pk)
        serializer = self.serializer_class(comment, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

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

    def partial_update(self, request, pk=None):
        notification = self.queryset.get(pk=pk)
        serializer = self.serializer_class(notification, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

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
