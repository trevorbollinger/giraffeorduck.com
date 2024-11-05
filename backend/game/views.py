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
from datetime import datetime, timedelta
import pytz

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
        central = pytz.timezone('US/Central')
        now = datetime.now(central)
 
        # current_date = '2024-11-03'
        current_date = now.strftime('%Y-%m-%d')

        now = datetime.strptime(current_date, '%Y-%m-%d').replace(tzinfo=central)

        today_date_str = now.strftime('%Y-%m-%d')
        seed = int(datetime.strptime(today_date_str, '%Y-%m-%d').timestamp())
        random.seed(seed)

        image_urls = []
        used_numbers = set()
        while len(image_urls) < 5:
            random_num = random.randint(155, 199)
            if random_num not in used_numbers:
                used_numbers.add(random_num)
                image_url = f"{request.scheme}://{request.get_host()}/media/images/image_{random_num}.jpg"
                image_urls.append(image_url)

        return Response({"image_urls": image_urls})
