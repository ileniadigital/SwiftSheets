from django.contrib import admin
from .models import SystemUser, Timesheet, Event, Comment, Notification

@admin.register(SystemUser)
class SystemUserAdmin(admin.ModelAdmin):
    list_display = ['id', 'username', 'user_type']
    search_fields = ['username', 'user_type']

@admin.register(Timesheet)
class TimesheetAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'start_date', 'end_date', 'submission_date', 'submission_time', 'review_status', 'payment_status', 'auto_submit', 'is_submitted', 'completion_reminder', 'last_edited', 'last_reviewed')
    list_filter = ('review_status', 'payment_status', 'is_submitted')
    search_fields = ('user__username', 'review_status', 'payment_status')

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    list_display = ('id', 'timesheet', 'date', 'duration', 'name', 'type', 'category', 'is_recurring')
    list_filter = ('category', 'type', 'is_recurring')
    search_fields = ('type', 'is_recurring', 'name')

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'timesheet', 'comment_text', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('comment_text',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'notification_type', 'created_at')
    list_filter = ('notification_type', 'created_at')
    search_fields = ('notification_type',)
    date_hierarchy = 'created_at'
    ordering = ('-created_at',)
