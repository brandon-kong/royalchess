# Generated by Django 5.0.1 on 2024-02-25 03:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("core_user", "0008_usersettings"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usersettings",
            name="theme",
            field=models.CharField(
                choices=[("light", "Light"), ("dark", "Dark"), ("system", "System")],
                default="light",
                max_length=64,
            ),
        ),
    ]
