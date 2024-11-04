from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, GameScoreSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import GameScore 
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.core.cache import cache 
import random

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def put(self, request):
        user = request.user
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    def delete(self, request):
        user = request.user
        user.delete()
        return Response(status=204)

class GameScoreListCreate(generics.ListCreateAPIView): 
    serializer_class = GameScoreSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return GameScore.objects.filter(user=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(user=self.request.user)
        else:
            print(serializer.errors)

class RandomImageView(APIView): 
    def get(self, request):
        last_update = cache.get('last_image_update')
        current_time = timezone.now().timestamp()
        one_min = 60
        one_day_in_seconds = 1 * 24 * 60 * 60  # 1 day * 24 hours * 60 mins * 60 seconds

        if not last_update or current_time - last_update > one_min: 
            random_num = random.randint(155, 199)
            image_url = f"{request.scheme}://{request.get_host()}/media/images/image_{random_num}.jpg"
            cache.set('last_image_update', current_time, timeout=None)
            cache.set('random_image_url', image_url, timeout=None)
        else:
            image_url = cache.get('random_image_url')

        return Response({"image_url": image_url})
