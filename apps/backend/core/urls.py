"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import include, path, re_path
from dj_rest_auth.registration.views import VerifyEmailView, ConfirmEmailView

prefix = "api/v1/"

urlpatterns = [
    path("admin/", admin.site.urls),
    path('auth/account-confirm-email/<str:key>/', ConfirmEmailView.as_view()),

    path("auth/oauth/", include("core.user.urls")),
    path("auth/", include("dj_rest_auth.urls")),
    path('auth/registration/', include('dj_rest_auth.registration.urls')),
    path("auth/registration/account-confirm-email/", VerifyEmailView.as_view(), name="account_email_verification_sent"),
    
    path('auth/verify-email/',
         VerifyEmailView.as_view(), name='rest_verify_email'),
    path('auth/account-confirm-email/',
         VerifyEmailView.as_view(), name='account_email_verification_sent'),

    re_path(r'^auth/account-confirm-email/(?P<key>[-:\w]+)/$',
         VerifyEmailView.as_view(), name='account_confirm_email'),

    path("accounts/", include("allauth.urls")),

    path("auth/knox/", include("knox.urls")),
    # Local apps
]
