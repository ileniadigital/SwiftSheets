from django.urls import include, path # type: ignore
from .views import TimesheetViewSet, EventViewset, SystemUserViewSet
from rest_framework_simplejwt.views import TokenObtainPairView,  TokenRefreshView # type: ignore
from rest_framework.routers import DefaultRouter # type: ignore

urlpatterns = [
    path("myapp-auth/", include("rest_framework.urls")),
]

