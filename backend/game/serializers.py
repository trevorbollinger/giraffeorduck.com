from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GameScore  # Import GameScore
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.utils import timezone

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name", "last_login"]
        extra_kwargs = {
            "password": {"write_only": True},
            "last_login": {"read_only": True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

class GameScoreSerializer(serializers.ModelSerializer):  # Add this class
    score = serializers.ListField(
        child=serializers.CharField(max_length=1),
        min_length=5,
        max_length=5,
        required=True
    )
    
    class Meta:
        model = GameScore
        fields = ['id', 'date', 'score', 'streak', 'iteration', 'user', 'hard_mode']
        read_only_fields = ['date', 'user']

    def validate_score(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Score must be a list")
        if not all(x in ['y', 'n'] for x in value):
            raise serializers.ValidationError("Score must contain only 'y' or 'n' characters")
        return value

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        # Update last login
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
        return data

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        
        # Add custom claims
        token['is_staff'] = user.is_staff
        token['is_superuser'] = user.is_superuser
        
        return token
