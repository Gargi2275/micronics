from django.db import migrations


ABOUT_PAGE_CONTENT = {
    "about-company": {
        "title": "A recovery-first company for business data",
        "short_description": "Micronics Devlon helps teams turn backup into a measurable operating discipline.",
        "body": (
            "Built for the pressure of real incidents.\n\n"
            "Our software and services are shaped around the moment teams need data back: "
            "clear policies, clean reporting, secure storage, and restore paths that have already been battle-tested.\n\n"
            "Recovery planning with verified RTO/RPO targets\n"
            "Security-minded backup operations with air-gapped immutability\n"
            "Multi-tenant MSP workflows and custom branding\n"
            "Straightforward service support from real storage engineers"
        ),
    },
    "about-company-management": {
        "title": "Company management",
        "short_description": "Meet the operating principles and people behind dependable recovery.",
        "body": (
            "Built for the pressure of real incidents.\n\n"
            "Our software and services are shaped around the moment teams need data back: "
            "clear policies, clean reporting, secure storage, and restore paths that have already been battle-tested.\n\n"
            "Recovery planning with verified RTO/RPO targets\n"
            "Security-minded backup operations with air-gapped immutability\n"
            "Multi-tenant MSP workflows and custom branding\n"
            "Straightforward service support from real storage engineers"
        ),
    },
    "about-video-gallery": {
        "title": "Video Gallery",
        "short_description": "Explore product walkthroughs, recovery demonstrations, and operational guidance.",
        "body": (
            "See recovery readiness in action.\n\n"
            "Add product tours, restore demonstrations, infrastructure explainers, and customer education videos "
            "from the About Pages admin screen."
        ),
    },
}


def sync_about_page_content(apps, schema_editor):
    resource_post = apps.get_model("api", "ResourcePost")
    for post_id, content in ABOUT_PAGE_CONTENT.items():
        resource_post.objects.filter(id=post_id).update(**content)


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0005_allow_uploaded_video_data"),
    ]

    operations = [
        migrations.RunPython(sync_about_page_content, migrations.RunPython.noop),
    ]
