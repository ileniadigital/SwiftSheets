from django.urls import path
from .views import TimesheetCreate, TimesheetListView, TimesheetDelete

urlpatterns = [
  path('timesheets/', TimesheetCreate.as_view(), name='create_timesheet'),
  # path('timesheet/delete/<int:pk>', TimesheetDelete.as_view(), name='delete-timesheet'),
  path('timesheets/not-reviewed/', TimesheetListView.as_view(), name='timesheet-not-reviewed-list'),
]