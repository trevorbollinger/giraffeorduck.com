
#Giraffe or Duck? Overview

## 1. Frontend
- **React.js**: Manage interactive UI, game logic, login forms, and score/streak display.
- **React Router**: Handle page navigation between Login, Game, and Profile.
- **React Toastify**: Display notifications for login success/failure and streaks.

## 2. Backend (Django + SQLite)
- **Django Framework**: Backend API logic, user authentication, and game state management.
- **SQLite Database**: Store user profiles, game records, and streaks.
- **Django Rest Framework (DRF)**: Expose API endpoints for login, fetching images, and tracking scores.

### Models Example (Django)
```python
from django.db import models
from django.contrib.auth.models import User

class GameRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    date = models.DateField(auto_now_add=True)
    streak = models.IntegerField(default=0)
```


## 3. Authentication and Streak Tracking
- **Token Authentication**: Use DRF’s token-based system to sync data across devices.
- **Daily Streak Logic**: Compare last game date with the current date to update streaks.

## 4. Docker Configuration
- **Backend**: Django and SQLite container.
- **Frontend**: React container.
- **Redis** (Optional): Store session data for quick access.


## 6. Summary
- **Frontend**: React + Tailwind CSS
- **Backend**: Django + SQLite + DRF
- **Authentication**: Token-based login to sync scores across devices.
- **Optional**: Redis for caching sessions.
- **Dockerized Services**: All components containerized.
