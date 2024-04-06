from django.urls import include, path # type: ignore
from .views import TimesheetViewSet, EventViewset, CommentViewSet, NotificationViewSet, TimesheetEventView, UserTimesheetView
from . import views
urlpatterns = [
    path("myapp-auth/", include("rest_framework.urls")),
    #path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.SystemUserLogin.as_view(), name='login'),
	path('logout', views.SystemUserLogout.as_view(), name='logout'),
	path('user', views.SystemUserView.as_view(), name='user'),
]

