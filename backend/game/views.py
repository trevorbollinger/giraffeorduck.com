from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, GameScoreSerializer 
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import GameScore, GameAnalytics
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils import timezone
from django.core.cache import cache 
import random
from datetime import datetime, timedelta
import pytz
import os
from django.conf import settings
import logging
import user_agents

logger = logging.getLogger(__name__)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        # Update last login time
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
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
    permission_classes = [AllowAny]  # Change to AllowAny
    queryset = GameScore.objects.all()

    def get_queryset(self):
        if self.request.user.is_authenticated:
            return GameScore.objects.filter(user=self.request.user).order_by('-date')
        return GameScore.objects.none()

    def perform_create(self, serializer):
        if self.request.user.is_authenticated:
            user = self.request.user
        else:
            user = User.objects.get(username='Anonymous')  # Get the Anonymous user

        current_iteration = self.request.data.get('iteration', 0)
        hard_mode = self.request.data.get('hard_mode', False)  # Add this line
        
        try:
            logger.info(f"Processing game score for user {user.username}, iteration {current_iteration}")
            
            # Get all previous scores for this user
            previous_scores = GameScore.objects.filter(
                user=user,
                iteration__lt=current_iteration  # Only get scores from previous iterations
            ).order_by('-iteration')
            
            # Find the most recent previous iteration's score
            last_different_score = previous_scores.first()
            
            new_streak = 1  # Initialize with 1 instead of 0
            if last_different_score:
                logger.info(f"Current iteration: {current_iteration}, Last iteration: {last_different_score.iteration}")
                logger.info(f"Previous streak: {last_different_score.streak}")
                
                # Start streak at 2 for first consecutive day
                if last_different_score.iteration == current_iteration - 1:
                    new_streak = last_different_score.streak + 1
                    logger.info(f"Consecutive iteration! New streak: {new_streak}")
                else:
                    logger.info(f"Streak reset to 1. Iteration gap: {current_iteration - last_different_score.iteration}")
            
            # Check for existing score for current iteration
            existing_score = GameScore.objects.filter(
                user=user,
                iteration=current_iteration
            ).first()
            
            if existing_score:
                logger.info(f"Updating existing score for iteration {current_iteration}")
                existing_score.score = self.request.data.get('score', [])
                existing_score.streak = new_streak
                existing_score.date = timezone.now()
                existing_score.hard_mode = hard_mode  # Add this line
                existing_score.save()
            else:
                logger.info(f"Creating new score for iteration {current_iteration}")
                serializer.save(
                    user=user,
                    score=self.request.data.get('score', []),
                    iteration=current_iteration,
                    streak=new_streak,
                    hard_mode=hard_mode  # Add this line
                )
            
            # After saving the game score, log analytics
            user_agent_string = self.request.META.get('HTTP_USER_AGENT', '')
            user_agent = user_agents.parse(user_agent_string)
            
            # Get the client's IP address
            x_forwarded_for = self.request.META.get('HTTP_X_FORWARDED_FOR')
            ip_address = x_forwarded_for.split(',')[0] if x_forwarded_for else self.request.META.get('REMOTE_ADDR')

            GameAnalytics.objects.create(
                user=self.request.user if self.request.user.is_authenticated else None,
                score=self.request.data.get('score', []),
                iteration=current_iteration,
                streak=new_streak,
                hard_mode=hard_mode,
                user_agent=user_agent_string,
                browser=user_agent.browser.family,
                browser_version=user_agent.browser.version_string,
                operating_system=user_agent.os.family,
                device_type='Mobile' if user_agent.is_mobile else ('Tablet' if user_agent.is_tablet else 'Desktop'),
                screen_resolution=self.request.data.get('screenResolution'),
                language=self.request.META.get('HTTP_ACCEPT_LANGUAGE', ''),
                ip_address=ip_address
            )
                
        except Exception as e:
            logger.error(f"Error saving analytics: {e}", exc_info=True)
            raise

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

        set1_count = 80  
        set2_count = 71  

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
                image_url = f"{request.scheme}://{request.get_host()}/images/{set_choice}/{image_name}"
                image_urls.append(image_url)

        start_date = datetime(2024, 2, 22, tzinfo=central)
        current_iteration = (now - start_date).days

        return Response({
            "image_urls": image_urls,
            "answer_key": answer_key,
            "current_iteration": current_iteration
        })
