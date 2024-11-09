from django.contrib.auth.models import User
from django.db import models

class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    score = models.JSONField()
    streak = models.IntegerField(default=0)
    iteration = models.IntegerField(default=0)
    hard_mode = models.BooleanField(default=False)  # Add this line

    def __str__(self):
        return f"{self.user.username} - {self.date.strftime('%Y-%m-%d %H:%M')}"

class GameAnalytics(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(auto_now_add=True)
    score = models.JSONField()
    streak = models.IntegerField(default=0)
    iteration = models.IntegerField()
    hard_mode = models.BooleanField(default=False)
    
    # Device and browser info
    user_agent = models.TextField(null=True, blank=True)
    browser = models.CharField(max_length=100, null=True, blank=True)
    browser_version = models.CharField(max_length=50, null=True, blank=True)
    operating_system = models.CharField(max_length=50, null=True, blank=True)
    device_type = models.CharField(max_length=50, null=True, blank=True)
    screen_resolution = models.CharField(max_length=50, null=True, blank=True)
    language = models.CharField(max_length=10, null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)

    def __str__(self):
        user_str = self.user.username if self.user else 'Anonymous'
        return f"{user_str} - {self.date.strftime('%Y-%m-%d %H:%M')}"
