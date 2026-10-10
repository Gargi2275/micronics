from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0010_brand_settings"),
    ]

    operations = [
        migrations.AddField(
            model_name="sitesettings",
            name="brand_logo_size",
            field=models.PositiveIntegerField(default=36),
        ),
    ]
