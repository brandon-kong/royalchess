from django.contrib.auth import authenticate
from django.utils.translation import gettext_lazy as _
from rest_framework import exceptions, serializers

from core.user.models import User


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for user model.
    """

    class Meta:
        model = User
        fields = [
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_active",
            "date_joined",
        ]
        read_only_fields = ["id", "is_staff", "is_active", "date_joined"]
        extra_kwargs = {
            "email": {"required": True},
            "first_name": {"required": False},
            "last_name": {"required": False},
        }
