from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0007_add_about_gallery_images"),
    ]

    operations = [
        migrations.CreateModel(
            name="Blog",
            fields=[
                ("id", models.CharField(default="item", max_length=100, primary_key=True, serialize=False)),
                ("title", models.CharField(max_length=255)),
                ("slug", models.SlugField(blank=True, max_length=255)),
                ("category", models.CharField(blank=True, max_length=255, null=True)),
                ("starred", models.BooleanField(default=False)),
                ("badge", models.CharField(blank=True, max_length=255, null=True)),
                ("short_description", models.TextField(blank=True, default="")),
                ("body", models.TextField(blank=True, default="")),
                ("icon", models.CharField(blank=True, default="Boxes", max_length=100)),
                ("image", models.TextField(blank=True, default="")),
                ("status", models.CharField(choices=[("draft", "Draft"), ("published", "Published")], default="published", max_length=50)),
                ("order", models.IntegerField(default=0)),
                ("seo_title", models.CharField(blank=True, default="", max_length=255)),
                ("seo_description", models.TextField(blank=True, default="")),
                ("author", models.CharField(blank=True, default="", max_length=255)),
                ("gallery_images", models.JSONField(blank=True, default=list)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name": "Blog",
                "verbose_name_plural": "Blogs",
                "ordering": ["order", "-created_at"],
            },
        ),
    ]
