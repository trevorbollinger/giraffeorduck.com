
# 'Giraffe or Duck?' Stack Overview

## 1. Frontend
- **React.js**: Manage interactive UI, game logic, login forms, and score/streak display.
- **React Router**: Handle page navigation between Login, Game, and Profile.
- **Tailwind CSS**: Provide responsive and styled UI components.
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

### Login API Endpoint Example
```python
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from rest_framework.response import Response

@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, _ = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid credentials'}, status=400)
```

## 3. Authentication and Streak Tracking
- **Token Authentication**: Use DRF’s token-based system to sync data across devices.
- **Daily Streak Logic**: Compare last game date with the current date to update streaks.

## 4. Docker Configuration
- **Backend**: Django and SQLite container.
- **Frontend**: React container.
- **Redis** (Optional): Store session data for quick access.

### Docker Compose Configuration
```yaml
version: '3'
services:
  django:
    build: ./backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    environment:
      - REDIS_HOST=redis
    restart: always

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    restart: always

  redis:
    image: redis:alpine
    restart: always

  nginx:
    image: nginx:latest
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - django
      - frontend
```

## 5. NGINX Reverse Proxy Configuration
```nginx
server {
    listen 80;

    location / {
        proxy_pass http://frontend:3000;
    }

    location /api/ {
        proxy_pass http://django:8000;
    }
}
```

## 6. Summary
- **Frontend**: React + Tailwind CSS
- **Backend**: Django + SQLite + DRF
- **Authentication**: Token-based login to sync scores across devices.
- **Optional**: Redis for caching sessions.
- **Dockerized Services**: All components containerized with NGINX as reverse proxy.
