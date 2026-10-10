from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_about_media_fields"),
    ]

    operations = [
        migrations.AlterField(
            model_name="resourcepost",
            name="video_url",
            field=models.TextField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="testimonial",
            name="video_url",
            field=models.TextField(blank=True, default=""),
        ),
    ]
