from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0008_add_blogs"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="hero_sources",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="sitesettings",
            name="hero_destinations",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
