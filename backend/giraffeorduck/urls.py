from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from game.views import CreateUserView, UserDetailView, RandomImageView  # Import RandomImageView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("game/user/register/", CreateUserView.as_view(), name="register"),
    path("game/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("game/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("game-auth/", include("rest_framework.urls")),
    path("game/", include("game.urls")),
    path("game/user/me/", UserDetailView.as_view(), name="user-detail"),
    path("game/random-image/", RandomImageView.as_view(), name="random-image"),  # Add this line
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
