from django.urls import include, path
from .views import TimesheetViewSet, EventViewset, SystemUserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView
from rest_framework.routers import DefaultRouter
from .views import login

urlpatterns = [
    path("myapp-auth/", include("rest_framework.urls")),
]

