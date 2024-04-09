"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin # type: ignore
from django.urls import path, include # type: ignore
# from backend.myapp import views
from myapp import views  # Adjust the import path
from myapp.views import SystemUserViewSet, TimesheetViewSet, EventViewset, CommentViewSet, NotificationViewSet, TimesheetEventView, UserTimesheetView
from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView# type: ignore
from rest_framework.routers import DefaultRouter# type: ignore
from django.urls import reverse# type: ignore
from myapp.views import login

urlpatterns = [
    path('admin/', admin.site.urls),
    path("myapp-auth/", include("rest_framework.urls")),
    path("myapp/", include("myapp.urls")),
    path('myapp/timesheet-events/', views.TimesheetEventView.as_view(), name='timesheet_events'),
    path('myapp/user-timesheets/', UserTimesheetView.as_view(), name='user_timesheets'),
    path('create_timesheet/', views.create_timesheet, name='create_timesheet'),
    path('create_events/<int:timesheet_id>/', views.create_events, name='create_events'),
    path('login/', login, name='login'),

    # path('myapp/timesheets/not-reviewed/', TimesheetListView.as_view(), name='timesheet-not-reviewed-list'),
]

router = DefaultRouter()
router.register('systemuser', SystemUserViewSet , basename='systemuser')
router.register('timesheet', TimesheetViewSet , basename='timesheet')
router.register('event', EventViewset, basename='event')
router.register('comment', CommentViewSet , basename='comment')
router.register('notification', NotificationViewSet , basename='notification')
urlpatterns += router.urls

