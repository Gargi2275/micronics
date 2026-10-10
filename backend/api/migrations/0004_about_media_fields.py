from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_seed_about_page_categories"),
    ]

    operations = [
        migrations.AddField(
            model_name="resourcepost",
            name="video_url",
            field=models.URLField(blank=True, default=""),
        ),
        migrations.AddField(
            model_name="testimonial",
            name="video_url",
            field=models.URLField(blank=True, default=""),
        ),
    ]
