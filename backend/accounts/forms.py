from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import User, Profile

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("email", "username")

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = User
        fields = ("username", "password")

class ProfileForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ('bio', 'avatar', 'website')