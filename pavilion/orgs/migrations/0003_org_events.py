# Generated by Django 3.2.6 on 2021-09-05 14:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0002_remove_org_events'),
    ]

    operations = [
        migrations.AddField(
            model_name='org',
            name='events',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='orgs.event'),
            preserve_default=False,
        ),
    ]
