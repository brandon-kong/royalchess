from django.urls import path

from .views import GoogleLoginView, GithubLoginView, LichessLoginView

urlpatterns = [
    path("google/", GoogleLoginView.as_view(), name="google_login"),
    path("github/", GithubLoginView.as_view(), name="github_login"),
    path("lichess/", LichessLoginView.as_view(), name="lichess_login"),
]
