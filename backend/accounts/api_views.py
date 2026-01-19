from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model
from .serializers import ProfileSerializer

User = get_user_model()

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not username or not password or not email:
            return Response({"error": "All fields are required."}, status=400)

        if User.objects.filter(username__iexact=username).exists():
            return Response({"error": "Username already exists."}, status=400)
        
        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists."}, status=400)

        user = User.objects.create_user(username=username, password=password, email=email)
        return Response({"message": "User registered successfully."}, status=201)

class ProfileDetailView(APIView):
    def get(self, request, username):
        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"error": "User not found."}, status=404)
        
        serializer = ProfileSerializer(user.profile)
        return Response(serializer.data)
    
