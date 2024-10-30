from django.contrib.auth.models import User
from django.db import models

class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


class GameScore(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(auto_now_add=True)
    score = models.IntegerField()
    streak = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.user.username} - {self.score} points"
