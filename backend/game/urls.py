from django.urls import path
from . import views
from .views import UserDetailView

urlpatterns = [
    path('user/me/', UserDetailView.as_view(), name='user-detail'),
    path("scores/", views.GameScoreListCreate.as_view(), name="gamescore-list"),
]
