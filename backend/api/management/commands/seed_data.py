import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from api.models import (
    HeroSlide,
    Product,
    Service,
    Solution,
    Feature,
    Platform,
    PricingPlan,
    FAQItem,
    Testimonial,
    ResourcePost,
    Lead,
    NewsletterSubscriber,
    MediaItem,
    SiteSettings,
    AdminUser,
    ActivityLogItem,
)


class Command(BaseCommand):
    help = "Seed database with initial catalog, site settings, and demo data from initial_data.json"

    def handle(self, *args, **options):
        # 1. Create default superuser if not exists
        if not User.objects.filter(username="admin").exists():
            User.objects.create_superuser("admin", "admin@micronicsdevlon.com", "Admin123!")
            self.stdout.write(self.style.SUCCESS("Created superuser 'admin' with password 'Admin123!'"))
        else:
            self.stdout.write("Superuser 'admin' already exists.")

        # 2. Load JSON
        base_dir = Path(__file__).resolve().parent.parent.parent.parent
        json_path = base_dir / "initial_data.json"
        if not json_path.exists():
            self.stdout.write(self.style.ERROR(f"File {json_path} does not exist!"))
            return

        with open(json_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        # 3. HeroSlides
        for item in data.get("heroSlides", []):
            HeroSlide.objects.update_or_create(
                id=item["id"],
                defaults={
                    "title": item.get("title", ""),
                    "slug": item.get("slug", ""),
                    "category": item.get("category"),
                    "starred": item.get("starred", False),
                    "badge": item.get("badge"),
                    "headline": item.get("headline", ""),
                    "keyword": item.get("keyword", ""),
                    "subheading": item.get("subheading", ""),
                    "primary_cta": item.get("primaryCta", "Explore Solutions"),
                    "primary_link": item.get("primaryLink", "/solutions"),
                    "secondary_cta": item.get("secondaryCta", "Schedule Demo"),
                    "secondary_link": item.get("secondaryLink", "/contact"),
                    "image": item.get("image", ""),
                    "alt": item.get("alt", ""),
                    "order": item.get("order", 0),
                    "active": item.get("active", True),
                    "status": item.get("status", "published"),
                    "seo_title": item.get("seoTitle", ""),
                    "seo_description": item.get("seoDescription", ""),
                },
            )

        # Helper for BaseContent fields
        def base_fields(item):
            return {
                "title": item.get("title", ""),
                "slug": item.get("slug", ""),
                "category": item.get("category"),
                "starred": item.get("starred", False),
                "badge": item.get("badge"),
                "short_description": item.get("shortDescription", ""),
                "body": item.get("body", ""),
                "icon": item.get("icon", "Boxes"),
                "image": item.get("image", ""),
                "status": item.get("status", "published"),
                "order": item.get("order", 0),
                "seo_title": item.get("seoTitle", ""),
                "seo_description": item.get("seoDescription", ""),
            }

        # 4. Products
        for item in data.get("products", []):
            d = base_fields(item)
            d.update({
                "price": item.get("price", ""),
                "features": item.get("features", []),
                "platforms": item.get("platforms", []),
                "requirements": item.get("requirements", []),
                "faqs": item.get("faqs", []),
                "related": item.get("related", []),
            })
            Product.objects.update_or_create(id=item["id"], defaults=d)

        # 5. Services
        for item in data.get("services", []):
            d = base_fields(item)
            d.update({
                "included": item.get("included", []),
                "process": item.get("process", []),
                "audience": item.get("audience", []),
                "faqs": item.get("faqs", []),
            })
            Service.objects.update_or_create(id=item["id"], defaults=d)

        # 6. Solutions
        for item in data.get("solutions", []):
            d = base_fields(item)
            d.update({
                "benefits": item.get("benefits", []),
            })
            Solution.objects.update_or_create(id=item["id"], defaults=d)

        # 7. Features
        for item in data.get("features", []):
            d = base_fields(item)
            Feature.objects.update_or_create(id=item["id"], defaults=d)

        # 8. Platforms
        for item in data.get("platforms", []):
            d = base_fields(item)
            d.update({
                "benefits": item.get("benefits", []),
            })
            Platform.objects.update_or_create(id=item["id"], defaults=d)

        # 9. PricingPlans
        for item in data.get("pricingPlans", []):
            d = base_fields(item)
            d.update({
                "price": item.get("price", ""),
                "cadence": item.get("cadence", "/month"),
                "popular": item.get("popular", False),
                "features": item.get("features", []),
            })
            PricingPlan.objects.update_or_create(id=item["id"], defaults=d)

        # 10. FAQs
        for item in data.get("faqs", []):
            d = base_fields(item)
            d.update({
                "question": item.get("question", ""),
                "answer": item.get("answer", ""),
            })
            FAQItem.objects.update_or_create(id=item["id"], defaults=d)

        # 11. Testimonials
        for item in data.get("testimonials", []):
            d = base_fields(item)
            d.update({
                "quote": item.get("quote", ""),
                "person": item.get("person", ""),
                "company": item.get("company", ""),
            })
            Testimonial.objects.update_or_create(id=item["id"], defaults=d)

        # 12. Posts
        for item in data.get("posts", []):
            d = base_fields(item)
            d.update({
                "read_time": item.get("readTime", "5 min read"),
            })
            ResourcePost.objects.update_or_create(id=item["id"], defaults=d)

        # 13. Leads
        for item in data.get("leads", []):
            Lead.objects.update_or_create(
                id=item["id"],
                defaults={
                    "type": item.get("type", "contact"),
                    "name": item.get("name", ""),
                    "email": item.get("email", ""),
                    "company": item.get("company", ""),
                    "message": item.get("message", ""),
                    "status": item.get("status", "new"),
                    "notes": item.get("notes", ""),
                },
            )

        # 14. Newsletter
        for item in data.get("newsletter", []):
            NewsletterSubscriber.objects.update_or_create(
                id=item["id"],
                defaults={"email": item["email"]},
            )

        # 15. Media
        for item in data.get("media", []):
            MediaItem.objects.update_or_create(
                id=item["id"],
                defaults={
                    "name": item.get("name", ""),
                    "url": item.get("url", ""),
                    "type": item.get("type", "image/jpeg"),
                },
            )

        # 16. Settings
        settings_dict = data.get("settings", {})
        SiteSettings.objects.update_or_create(
            id=1,
            defaults={
                "company_name": settings_dict.get("companyName", "Micronics Devlon"),
                "tagline": settings_dict.get("tagline", ""),
                "contact_email": settings_dict.get("contactEmail", ""),
                "phone": settings_dict.get("phone", ""),
                "address": settings_dict.get("address", ""),
                "footer_text": settings_dict.get("footerText", ""),
                "default_theme": settings_dict.get("defaultTheme", "light"),
                "maintenance_mode": settings_dict.get("maintenanceMode", False),
                "socials": settings_dict.get("socials", []),
            },
        )

        # 17. Admin Users
        for item in data.get("users", []):
            AdminUser.objects.update_or_create(
                id=item["id"],
                defaults={
                    "name": item.get("name", ""),
                    "email": item.get("email", ""),
                    "role": item.get("role", "Admin"),
                    "active": item.get("active", True),
                },
            )

        # 18. Activity Log
        for item in data.get("activity", []):
            ActivityLogItem.objects.update_or_create(
                id=item["id"],
                defaults={
                    "actor": item.get("actor", "System"),
                    "action": item.get("action", "Initialized"),
                    "target": item.get("target", "System database"),
                },
            )

        self.stdout.write(self.style.SUCCESS("Successfully seeded all 16 collections to SQLite!"))
