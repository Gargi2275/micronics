from django.db import migrations


ABOUT_PAGE_CONTENT = [
    {
        "id": "about-company",
        "title": "Company",
        "slug": "company",
        "category": "Company",
        "short_description": "Micronics Devlon helps teams turn backup into a measurable operating discipline.",
        "body": (
            "Built for the pressure of real incidents.\n\n"
            "Micronics Devlon brings clear policies, secure storage, clean reporting, and verified restore paths together in one recovery-first operating model. "
            "Our platform helps teams protect business data and prove that recovery is ready before an incident happens."
        ),
        "image": "/images/hero_global_mesh.jpg",
        "icon": "Building2",
        "order": 1,
        "seo_title": "Company | Micronics Devlon",
        "seo_description": "Learn how Micronics Devlon helps teams build measurable backup and recovery readiness.",
    },
    {
        "id": "about-company-management",
        "title": "Company Management",
        "slug": "company-management",
        "category": "Company Management",
        "short_description": "Meet the operating principles behind dependable backup and recovery.",
        "body": (
            "Recovery is an operating discipline, not a checkbox.\n\n"
            "Our management approach connects people, policy, security, and evidence. "
            "Teams can assign ownership, monitor protection health, test restore paths, and keep executive reporting aligned with real operational outcomes."
        ),
        "image": "/images/hero_dashboard.jpg",
        "icon": "Users",
        "order": 2,
        "seo_title": "Company Management | Micronics Devlon",
        "seo_description": "Explore the management principles behind Micronics Devlon recovery operations.",
    },
    {
        "id": "about-video-gallery",
        "title": "Video Gallery",
        "slug": "video-gallery",
        "category": "Video Gallery",
        "short_description": "Explore product walkthroughs, recovery demonstrations, and operational guidance.",
        "body": (
            "See recovery readiness in action.\n\n"
            "Use this gallery to publish product tours, restore demonstrations, infrastructure explainers, and customer education videos. "
            "Add or replace gallery entries from the About Pages admin screen."
        ),
        "image": "/images/cloud_saas_protection.jpg",
        "icon": "Play",
        "order": 3,
        "seo_title": "Video Gallery | Micronics Devlon",
        "seo_description": "Watch Micronics Devlon product walkthroughs and recovery demonstrations.",
    },
]


def seed_about_pages(apps, schema_editor):
    resource_post = apps.get_model("api", "ResourcePost")
    for item in ABOUT_PAGE_CONTENT:
        resource_post.objects.update_or_create(
            id=item["id"],
            defaults={
                **item,
                "status": "published",
                "starred": False,
                "badge": "",
                "read_time": "3 min read",
            },
        )


def preserve_about_pages(apps, schema_editor):
    # Content is intentionally preserved if this migration is reversed.
    pass


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_sitesettings_legal_content"),
    ]

    operations = [
        migrations.RunPython(seed_about_pages, preserve_about_pages),
    ]
