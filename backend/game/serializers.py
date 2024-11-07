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
    score = serializers.ListField(
        child=serializers.CharField(max_length=1),
        min_length=5,
        max_length=5,
        required=True
    )
    
    class Meta:
        model = GameScore
        fields = ['id', 'date', 'score', 'streak', 'iteration', 'user']
        read_only_fields = ['date', 'user']

    def validate_score(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Score must be a list")
        if not all(x in ['y', 'n'] for x in value):
            raise serializers.ValidationError("Score must contain only 'y' or 'n' characters")
        return value
