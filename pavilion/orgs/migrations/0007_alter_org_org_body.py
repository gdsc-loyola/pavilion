# Generated by Django 3.2.6 on 2021-09-05 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orgs', '0006_org_events'),
    ]

    operations = [
        migrations.AlterField(
            model_name='org',
            name='org_body',
            field=models.CharField(choices=[('COA', 'COA'), ('LIONS', 'LIONS'), ('Sanggu', 'Sanggu')], max_length=100),
        ),
    ]
