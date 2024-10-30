from django.urls import path
from .views import login_user, submit_score, get_scores

urlpatterns = [
    path('login/', login_user, name='login'),
    path('submit_score/', submit_score, name='submit_score'),
    path('get_scores/', get_scores, name='get_scores'),
]
