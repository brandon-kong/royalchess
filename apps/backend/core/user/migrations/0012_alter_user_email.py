# Generated by Django 5.0.2 on 2024-05-11 18:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core_user', '0011_alter_user_email'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(default='', max_length=254, unique=True, verbose_name='email address'),
        ),
    ]
