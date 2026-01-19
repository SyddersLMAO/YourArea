from rest_framework import serializers
from .models import Profile
from django.contrib.auth.models import User

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'bio', 'avatar', 'username', 'email']
