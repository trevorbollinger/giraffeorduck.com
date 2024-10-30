from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import GameScore
from django.contrib.auth.models import User

@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = User.objects.filter(username=username).first()

    if user and user.check_password(password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_score(request):
    score = request.data.get('score')
    streak = request.data.get('streak')

    GameScore.objects.create(
        user=request.user, score=score, streak=streak
    )
    return Response({'message': 'Score submitted!'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_scores(request):
    scores = GameScore.objects.filter(user=request.user).order_by('-date')
    data = [{'date': s.date, 'score': s.score, 'streak': s.streak} for s in scores]
    return Response(data)
