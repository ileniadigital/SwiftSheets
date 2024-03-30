from datetime import timedelta, timezone
from django.utils import timezone
from django.db import models
# from django.contrib.auth.models import User

class SystemUser(models.Model):
    USER_TYPE_CHOICES = [
        ('Consultant', 'Consultant'),
        ('LineManager', 'LineManager'),
        ('FinanceTeamMember', 'FinanceTeamMember'),
        ('Administrator', 'Administrator'),
    ]
    username = models.EmailField(unique=True, null=True) 
    password = models.CharField(max_length=128, default='pass')  # Default password
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES, default='Consultant')  # Default user type

    def __str__(self):
        return self.username

class Timesheet(models.Model):
    REVIEW_STATUS_CHOICES = [
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
        ('Pending', 'Pending'),
    ]
    PAYMENT_STATUS_CHOICES = [
        ('Processed', 'Processed'),
        ('Inprogress', 'Inprogress'),
        ('Rejected', 'Rejected'),
    ]
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='timesheets')
    start_date = models.DateField(default=timezone.now().date() - timedelta(days=timezone.now().weekday()))#start default is moday
    end_date = models.DateField(default=timezone.now().date() + timedelta(days=6 - timezone.now().weekday()))#end default is sunday 
    submission_date = models.DateField(auto_now_add=True, blank=True, null=True)  # Changed auto_now_add to blank=True, null=True
    submission_time = models.DateTimeField(auto_now_add=True, blank=True)    
    review_status = models.CharField(max_length=20, choices=REVIEW_STATUS_CHOICES, default='Pending')
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='Inprogress')
    auto_submit = models.BooleanField(default=False)
    is_submitted = models.BooleanField(default=False)
    completion_reminder = models.DateTimeField(null=True, blank=True)
    last_edited = models.DateTimeField(null=True, blank=True)
    last_reviewed = models.DateTimeField(null=True, blank=True)

    # Ensure your __str__ method accounts for SystemUser attributes correctly
    def __str__(self):
        return f"{self.user.username} - {self.submission_time.strftime('%Y-%m-%d %H:%M')}"
    
class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ('Overtime', 'Overtime'),
        ('Holiday', 'Holiday'),
        ('Sick', 'Sick'),
        ('Normal', 'Normal'),
    ]
    EVENT_CATEGORY_CHOICES = [
        ('Planning', 'Planning'),
        ('Meeting', 'Meeting'),
        ('Project', 'Project'),
    ]
    timesheet = models.ForeignKey(Timesheet, on_delete=models.CASCADE, related_name='events')
    date = models.DateField()
    duration = models.FloatField(default=0.0)  # Default duration
    name = models.CharField(max_length=255, default='Event')  # Default name
    type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='Normal')  # Default type
    category = models.CharField(max_length=20, choices=EVENT_CATEGORY_CHOICES, default='Planning')  # Default category
    is_recurring = models.BooleanField(default=False)
    #note = models.TextField(blank=True, default='')  # Default note

    def __str__(self):
        return self.name

class Comment(models.Model):
    timesheet = models.ForeignKey(Timesheet, on_delete=models.CASCADE, related_name='comments')
    comment_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Notification(models.Model):
    NOTIFICATION_TYPE_CHOICES = [
        ('Approved_Timesheet', 'Approved Timesheet'),
        ('Rejected_Timesheet', 'Rejected Timesheet'),
        ('Submitted', 'Submitted'),
        ('Reminder', 'Reminder'),
        ('Revoked', 'Revoked'),
        ('Processed_Payment', 'Processed Payment'),
        ('Rejected_Payment', 'Rejected Payment'),
    ]
    user = models.ForeignKey(SystemUser, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=32, choices=NOTIFICATION_TYPE_CHOICES, default='Submitted')  # Default notification type
    created_at = models.DateTimeField(auto_now_add=True)

