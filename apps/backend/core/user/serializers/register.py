from allauth.account.adapter import get_adapter
from allauth.socialaccount.models import EmailAddress, SocialAccount
from dj_rest_auth.registration.serializers import RegisterSerializer
from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions, serializers


class UserRegisterSerializer(RegisterSerializer):
    """
    Serializer for user creation
    """

    username = None

    def get_cleaned_data(self):
        return {
            "password1": self.validated_data.get("password1", ""),
            "email": self.validated_data.get("email", ""),
        }
