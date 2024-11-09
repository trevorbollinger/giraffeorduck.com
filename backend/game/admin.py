from django.contrib import admin
from .models import GameScore
from .models import GameAnalytics
# Register your models here.
admin.site.register(GameScore)
admin.site.register(GameAnalytics)