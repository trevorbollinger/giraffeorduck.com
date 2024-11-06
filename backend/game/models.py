from django.contrib.auth.models import User
from django.db import models

class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)  # Changed from DateField to DateTimeField
    score = models.IntegerField()
    streak = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.score} points"
