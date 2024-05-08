import os

import environ

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Cast values and assign
env = environ.Env(
    # Debugging
    DEBUG=(bool, True),
    # Security
    ALLOWED_HOSTS=(list, []),
    CORS_ORIGIN_WHITELIST=(list, []),
    # Database
    DATABASE_URL=(str, "sqlite:///db.sqlite3"),
    # Secret
    SECRET_KEY=(str, "secret"),
    
    CACHE_URL=(str, "redis://localhost:6379/1"),

    _GOOGLE_CLIENT_ID=(str, "GOOGLE_CLIENT_ID"),
    _GOOGLE_CLIENT_SECRET=(str, "GOOGLE_CLIENT_SECRET"),

    _GITHUB_CLIENT_ID=(str, "GITHUB_CLIENT_ID"),
    _GITHUB_CLIENT_SECRET=(str, "GITHUB_CLIENT_SECRET"),

    _LICHESS_CLIENT_ID=(str, "LICHESS_CLIENT_ID"),
    _LICHESS_CLIENT_SECRET=(str, "LICHESS_CLIENT_SECRET")

)

environ.Env.read_env(os.path.join(BASE_DIR, ".env"))
