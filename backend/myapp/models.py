from django.db import models

class User(models.Model):
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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='timesheets')
    submission_time = models.DateTimeField(auto_now_add=True)  # Default submission time
    review_status = models.CharField(max_length=20, choices=REVIEW_STATUS_CHOICES, default='Pending')  # Default review status
    payment_status = models.CharField(max_length=20, choices=PAYMENT_STATUS_CHOICES, default='Inprogress')  # Default payment status
    auto_submit = models.BooleanField(default=False)
    is_submitted = models.BooleanField(default=False)
    completion_reminder = models.DateTimeField(null=True, blank=True)
    last_edited = models.DateTimeField(null=True, blank=True)
    last_reviewed = models.DateTimeField(null=True, blank=True)

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
    note = models.TextField(blank=True, default='')  # Default note

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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=32, choices=NOTIFICATION_TYPE_CHOICES, default='Submitted')  # Default notification type
    created_at = models.DateTimeField(auto_now_add=True)

