from django.contrib import admin
from django.urls import path, include
from game.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("game/user/register/", CreateUserView.as_view(), name="register"),
    path("game/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("game/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("game-auth/", include("rest_framework.urls")),
    path("game/", include("game.urls")),
]
