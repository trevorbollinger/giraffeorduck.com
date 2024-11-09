from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from game.views import CreateUserView, UserDetailView, GameDataView  # Import GameDataView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from game.serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

urlpatterns = [
    path('admin/', admin.site.urls),
    path("game/user/register/", CreateUserView.as_view(), name="register"),
    path("game/token/", CustomTokenObtainPairView.as_view(), name="get_token"),  # Update this line
    path("game/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("game-auth/", include("rest_framework.urls")),
    path("game/", include("game.urls")),
    path("game/user/me/", UserDetailView.as_view(), name="user-detail"),
    path("game/game-data/", GameDataView.as_view(), name="game-data"),  # Update this line
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
