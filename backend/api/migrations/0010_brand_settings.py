from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0009_hero_integration_settings"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="brand_logo",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="brand_name",
            field=models.CharField(blank=True, default="Micronics Devlon", max_length=255),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="brand_subtitle",
            field=models.CharField(blank=True, default="Data Protection", max_length=255),
        ),
    ]
