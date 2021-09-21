# Generated by Django 3.2.6 on 2021-09-18 18:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0005_auto_20210919_0119'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='cover_photo',
            field=models.CharField(default='cover photo url', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='event_photo1',
            field=models.CharField(default='event photo1 url', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='event_photo2',
            field=models.CharField(default='event photo2 url', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='event_photo3',
            field=models.CharField(default='event photo3 url', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='event_photo4',
            field=models.CharField(default='event photo4 url', max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='org',
            name='logo',
            field=models.CharField(default='logo url', max_length=100),
            preserve_default=False,
        ),
    ]