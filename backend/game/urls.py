from django.urls import path
from . import views
from .views import UserDetailView, GameScoreListCreate  # Import GameScoreListCreate

urlpatterns = [
    path('user/me/', UserDetailView.as_view(), name='user-detail'),
    path("scores/", views.GameScoreListCreate.as_view(), name="gamescore-list"),
    path("submit-score/", views.GameScoreListCreate.as_view(), name="submit-score"),  # Add this line
]
