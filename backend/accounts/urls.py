from django.urls import path
from .api_views import ProfileDetailView, RegisterView
from .views import signup_view, login_view, logout_view, edit_profile, profile_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("logout/", logout_view, name="logout"),
    path('profile/edit/', edit_profile, name='edit_profile'),
    
    path("api/register/", RegisterView.as_view(), name="register_api"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path('api/profile/<str:username>/', profile_view, name='profile_api'),
]
