from django.urls import path
from .api_views import ProfileDetailView, RegisterView
from .views import signup_view, login_view, logout_view, edit_profile, profile_view, profile_edit, current_user_profile
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("logout/", logout_view, name="logout"),
    path('profile/edit/', edit_profile, name='edit_profile'),
    
    path("api/register/", RegisterView.as_view(), name="register_api"),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    path('api/currentprofile/', current_user_profile, name='current_user_profile_api'),
    path('api/profile/<str:username>/', profile_view, name='profile_api'),
    path('api/profile/update/', current_user_profile, name='profile_edit_api'),
]
