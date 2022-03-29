# Generated by Django 3.2.7 on 2022-03-29 17:31

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('avatar', models.CharField(blank=True, max_length=200, null=True)),
                ('status', models.CharField(choices=[('S', 'Student'), ('P', 'Professor')], max_length=9)),
                ('faculty', models.CharField(blank=True, max_length=200)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Project',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('status', models.BooleanField(default=True)),
                ('adviser', models.ManyToManyField(related_name='advice', to='rest_google_auth.Profile')),
                ('owner', models.ManyToManyField(related_name='own', to='rest_google_auth.Profile')),
            ],
        ),
    ]
