from django.contrib.auth.models import User
from rest_framework import serializers
from .models import GameScore  # Import GameScore

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "first_name", "last_name"]  # Include last_name
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.save()
        return instance

class GameScoreSerializer(serializers.ModelSerializer):  # Add this class
    class Meta:
        model = GameScore
        fields = ["id", "score", "streak", "date", "user", "iteration"]  # Add iteration
        extra_kwargs = {"user": {"read_only": True}}
