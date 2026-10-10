from rest_framework import serializers
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


class HeroSlideSerializer(serializers.ModelSerializer):
    primaryCta = serializers.CharField(source="primary_cta", required=False, allow_blank=True)
    primaryLink = serializers.CharField(source="primary_link", required=False, allow_blank=True)
    secondaryCta = serializers.CharField(source="secondary_cta", required=False, allow_blank=True)
    secondaryLink = serializers.CharField(source="secondary_link", required=False, allow_blank=True)
    seoTitle = serializers.CharField(source="seo_title", required=False, allow_blank=True)
    seoDescription = serializers.CharField(source="seo_description", required=False, allow_blank=True)
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)
    updatedAt = serializers.DateTimeField(source="updated_at", read_only=True)

    class Meta:
        model = HeroSlide
        fields = [
            "id",
            "title",
            "slug",
            "category",
            "starred",
            "badge",
            "headline",
            "keyword",
            "subheading",
            "primaryCta",
            "primaryLink",
            "secondaryCta",
            "secondaryLink",
            "image",
            "alt",
            "order",
            "active",
            "status",
            "seoTitle",
            "seoDescription",
            "createdAt",
            "updatedAt",
        ]


class BaseContentSerializer(serializers.ModelSerializer):
    shortDescription = serializers.CharField(source="short_description", required=False, allow_blank=True)
    seoTitle = serializers.CharField(source="seo_title", required=False, allow_blank=True)
    seoDescription = serializers.CharField(source="seo_description", required=False, allow_blank=True)
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)
    updatedAt = serializers.DateTimeField(source="updated_at", read_only=True)

    base_fields = [
        "id",
        "title",
        "slug",
        "category",
        "starred",
        "badge",
        "shortDescription",
        "body",
        "icon",
        "image",
        "status",
        "order",
        "seoTitle",
        "seoDescription",
        "createdAt",
        "updatedAt",
    ]


class ProductSerializer(BaseContentSerializer):
    class Meta:
        model = Product
        fields = BaseContentSerializer.base_fields + [
            "price",
            "features",
            "platforms",
            "requirements",
            "faqs",
            "related",
        ]


class ServiceSerializer(BaseContentSerializer):
    class Meta:
        model = Service
        fields = BaseContentSerializer.base_fields + [
            "included",
            "process",
            "audience",
            "faqs",
        ]


class SolutionSerializer(BaseContentSerializer):
    class Meta:
        model = Solution
        fields = BaseContentSerializer.base_fields + ["benefits"]


class FeatureSerializer(BaseContentSerializer):
    class Meta:
        model = Feature
        fields = BaseContentSerializer.base_fields


class PlatformSerializer(BaseContentSerializer):
    class Meta:
        model = Platform
        fields = BaseContentSerializer.base_fields + ["benefits"]


class PricingPlanSerializer(BaseContentSerializer):
    class Meta:
        model = PricingPlan
        fields = BaseContentSerializer.base_fields + [
            "price",
            "cadence",
            "popular",
            "features",
        ]


class FAQItemSerializer(BaseContentSerializer):
    class Meta:
        model = FAQItem
        fields = BaseContentSerializer.base_fields + [
            "question",
            "answer",
        ]


class TestimonialSerializer(BaseContentSerializer):
    class Meta:
        model = Testimonial
        fields = BaseContentSerializer.base_fields + [
            "quote",
            "person",
            "company",
            "videoUrl",
            "galleryImages",
        ]
    videoUrl = serializers.CharField(source="video_url", required=False, allow_blank=True)
    galleryImages = serializers.ListField(source="gallery_images", required=False)


class ResourcePostSerializer(BaseContentSerializer):
    readTime = serializers.CharField(source="read_time", required=False, allow_blank=True)
    videoUrl = serializers.CharField(source="video_url", required=False, allow_blank=True)

    class Meta:
        model = ResourcePost
        fields = BaseContentSerializer.base_fields + [
            "readTime",
            "videoUrl",
            "galleryImages",
        ]
    galleryImages = serializers.ListField(source="gallery_images", required=False)


class BlogSerializer(BaseContentSerializer):
    author = serializers.CharField(required=False, allow_blank=True)
    galleryImages = serializers.ListField(source="gallery_images", required=False)

    class Meta:
        model = Blog
        fields = BaseContentSerializer.base_fields + [
            "author",
            "galleryImages",
        ]


class LeadSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = Lead
        fields = [
            "id",
            "type",
            "name",
            "email",
            "company",
            "message",
            "status",
            "notes",
            "createdAt",
        ]


class NewsletterSubscriberSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = NewsletterSubscriber
        fields = [
            "id",
            "email",
            "createdAt",
        ]


class MediaItemSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = MediaItem
        fields = [
            "id",
            "name",
            "url",
            "type",
            "createdAt",
        ]


class SiteSettingsSerializer(serializers.ModelSerializer):
    companyName = serializers.CharField(source="company_name", required=False)
    contactEmail = serializers.CharField(source="contact_email", required=False, allow_blank=True)
    footerText = serializers.CharField(source="footer_text", required=False, allow_blank=True)
    privacyPolicy = serializers.CharField(source="privacy_policy", required=False, allow_blank=True)
    termsOfService = serializers.CharField(source="terms_of_service", required=False, allow_blank=True)
    heroSources = serializers.JSONField(source="hero_sources", required=False)
    heroDestinations = serializers.JSONField(source="hero_destinations", required=False)
    brandLogo = serializers.CharField(source="brand_logo", required=False, allow_blank=True)
    brandLogoSize = serializers.IntegerField(source="brand_logo_size", required=False, min_value=16, max_value=96)
    brandName = serializers.CharField(source="brand_name", required=False, allow_blank=True)
    brandSubtitle = serializers.CharField(source="brand_subtitle", required=False, allow_blank=True)
    defaultTheme = serializers.CharField(source="default_theme", required=False)
    maintenanceMode = serializers.BooleanField(source="maintenance_mode", required=False)

    class Meta:
        model = SiteSettings
        fields = [
            "companyName",
            "tagline",
            "contactEmail",
            "phone",
            "address",
            "footerText",
            "privacyPolicy",
            "termsOfService",
            "heroSources",
            "heroDestinations",
            "brandLogo",
            "brandLogoSize",
            "brandName",
            "brandSubtitle",
            "defaultTheme",
            "maintenanceMode",
            "socials",
        ]


class AdminUserSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = AdminUser
        fields = [
            "id",
            "name",
            "email",
            "role",
            "active",
            "createdAt",
        ]


class ActivityLogItemSerializer(serializers.ModelSerializer):
    createdAt = serializers.DateTimeField(source="created_at", read_only=True)

    class Meta:
        model = ActivityLogItem
        fields = [
            "id",
            "actor",
            "action",
            "target",
            "createdAt",
        ]
