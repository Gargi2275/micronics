from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0006_sync_about_page_frontend_content"),
    ]

    operations = [
        migrations.AddField(
            model_name="resourcepost",
            name="gallery_images",
            field=models.JSONField(blank=True, default=list),
        ),
        migrations.AddField(
            model_name="testimonial",
            name="gallery_images",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
