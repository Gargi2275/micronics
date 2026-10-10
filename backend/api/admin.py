from django.contrib import admin
from .models import (
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
    Blog,
    Lead,
    NewsletterSubscriber,
    MediaItem,
    SiteSettings,
    AdminUser,
    ActivityLogItem,
)


@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "status", "active", "headline", "updated_at")
    list_filter = ("status", "active")
    search_fields = ("title", "headline", "subheading", "keyword")
    list_editable = ("order", "status", "active")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "category", "order", "status", "starred", "updated_at")
    list_filter = ("status", "starred", "category")
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status", "starred")


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order", "status", "starred", "updated_at")
    list_filter = ("status", "starred")
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status")


@admin.register(Solution)
class SolutionAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order", "status", "starred", "updated_at")
    list_filter = ("status", "starred")
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status")


@admin.register(Feature)
class FeatureAdmin(admin.ModelAdmin):
    list_display = ("title", "icon", "order", "status", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status")


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "order", "status", "updated_at")
    list_filter = ("status", "category")
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status")


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = ("title", "price", "cadence", "popular", "order", "status")
    list_filter = ("status", "popular")
    search_fields = ("title", "price")
    list_editable = ("order", "popular", "status")


@admin.register(FAQItem)
class FAQItemAdmin(admin.ModelAdmin):
    list_display = ("question", "category", "order", "status")
    list_filter = ("status", "category")
    search_fields = ("question", "answer", "title")
    list_editable = ("order", "status")


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("person", "company", "order", "status")
    list_filter = ("status",)
    search_fields = ("person", "company", "quote")
    list_editable = ("order", "status")


@admin.register(ResourcePost)
class ResourcePostAdmin(admin.ModelAdmin):
    list_display = ("title", "category", "read_time", "order", "status")
    list_filter = ("status", "category")
    search_fields = ("title", "short_description", "body")
    list_editable = ("order", "status")


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ("title", "author", "order", "status", "updated_at")
    list_filter = ("status",)
    search_fields = ("title", "short_description", "body", "author")
    list_editable = ("order", "status")


@admin.register(Lead)
class LeadAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "type", "company", "status", "created_at")
    list_filter = ("status", "type")
    search_fields = ("name", "email", "company", "message", "notes")
    list_editable = ("status",)


@admin.register(NewsletterSubscriber)
class NewsletterSubscriberAdmin(admin.ModelAdmin):
    list_display = ("email", "created_at")
    search_fields = ("email",)


@admin.register(MediaItem)
class MediaItemAdmin(admin.ModelAdmin):
    list_display = ("name", "type", "created_at")
    search_fields = ("name", "url")


@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ("company_name", "tagline", "contact_email", "phone", "default_theme", "maintenance_mode")

    def has_add_permission(self, request):
        return not SiteSettings.objects.exists()


@admin.register(AdminUser)
class AdminUserAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "role", "active", "created_at")
    list_filter = ("role", "active")
    search_fields = ("name", "email")
    list_editable = ("role", "active")


@admin.register(ActivityLogItem)
class ActivityLogItemAdmin(admin.ModelAdmin):
    list_display = ("actor", "action", "target", "created_at")
    list_filter = ("action", "actor")
    search_fields = ("actor", "action", "target")
