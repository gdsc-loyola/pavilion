# Generated by Django 3.2.6 on 2021-09-18 17:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0004_auto_20210919_0042'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='desc',
            field=models.CharField(default='test', max_length=500),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.CharField(default='test location', max_length=100),
            preserve_default=False,
        ),
    ]
