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
import os
from django.conf import settings

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
        user = self.request.user
        current_date = timezone.now().date()
        existing_score = GameScore.objects.filter(user=user, date__date=current_date).first()
        
        if existing_score:
            existing_score.score = self.request.data.get('score')
            existing_score.streak = self.request.data.get('streak')
            existing_score.iteration = self.request.data.get('iteration')
            existing_score.date = timezone.now()  # Update the date to the current time
            existing_score.save()
        else:
            serializer.save(user=user, iteration=self.request.data.get('iteration'))

class GameDataView(APIView): 
    authentication_classes = []
    permission_classes = [AllowAny]

    def get(self, request):
        central = pytz.timezone('US/Central')
        now = datetime.now(central)
        current_date = now.strftime('%Y-%m-%d')
        now = datetime.strptime(current_date, '%Y-%m-%d').replace(tzinfo=central)
        today_date_str = now.strftime('%Y-%m-%d')
        base_seed = int(datetime.strptime(today_date_str, '%Y-%m-%d').timestamp())

        set1_count = 25  
        set2_count = 20  

        image_urls = []
        answer_key = []
        used_numbers = set()
        
        # Pre-determine all random choices using different seed offsets
        random.seed(base_seed)
        set_choices = []
        for i in range(5):
            set_choices.append(random.choice(['set1', 'set2']))

        for i, set_choice in enumerate(set_choices):
            random.seed(base_seed + i + 1)
            max_num = set1_count if set_choice == 'set1' else set2_count
            random_num = random.randint(1, max_num)
            
            if set_choice == 'set1':
                image_name = f"1_image_{random_num}.jpg"
                answer_key.append('g')
            else:
                image_name = f"2_image_{random_num}.jpg"
                answer_key.append('d')
            
            if (set_choice, random_num) not in used_numbers:
                used_numbers.add((set_choice, random_num))
                image_url = f"{request.scheme}://{request.get_host()}/media/{set_choice}/{image_name}"
                image_urls.append(image_url)

        start_date = datetime(2024, 2, 22, tzinfo=central)
        current_iteration = (now - start_date).days

        return Response({
            "image_urls": image_urls,
            "answer_key": answer_key,
            "current_iteration": current_iteration
        })
