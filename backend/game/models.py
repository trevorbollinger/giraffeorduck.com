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
