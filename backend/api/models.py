import uuid
from django.db import models


def generate_id(prefix="item"):
    return f"{prefix}-{uuid.uuid4()}"


class HeroSlide(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    starred = models.BooleanField(default=False)
    badge = models.CharField(max_length=255, blank=True, null=True)
    headline = models.CharField(max_length=500, blank=True, default="")
    keyword = models.CharField(max_length=255, blank=True, default="")
    subheading = models.TextField(blank=True, default="")
    primary_cta = models.CharField(max_length=255, blank=True, default="Explore Solutions")
    primary_link = models.CharField(max_length=255, blank=True, default="/solutions")
    secondary_cta = models.CharField(max_length=255, blank=True, default="Schedule Demo")
    secondary_link = models.CharField(max_length=255, blank=True, default="/contact")
    image = models.TextField(blank=True, default="")
    alt = models.CharField(max_length=255, blank=True, default="")
    order = models.IntegerField(default=0)
    active = models.BooleanField(default=True)
    status = models.CharField(max_length=50, default="published", choices=[("draft", "Draft"), ("published", "Published")])
    seo_title = models.CharField(max_length=255, blank=True, default="")
    seo_description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title or self.headline or self.id


class BaseContentItem(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, blank=True)
    category = models.CharField(max_length=255, blank=True, null=True)
    starred = models.BooleanField(default=False)
    badge = models.CharField(max_length=255, blank=True, null=True)
    short_description = models.TextField(blank=True, default="")
    body = models.TextField(blank=True, default="")
    icon = models.CharField(max_length=100, blank=True, default="Boxes")
    image = models.TextField(blank=True, default="")
    status = models.CharField(max_length=50, default="published", choices=[("draft", "Draft"), ("published", "Published")])
    order = models.IntegerField(default=0)
    seo_title = models.CharField(max_length=255, blank=True, default="")
    seo_description = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ["order", "-created_at"]

    def __str__(self):
        return self.title


class Product(BaseContentItem):
    price = models.CharField(max_length=100, blank=True, default="")
    features = models.JSONField(default=list, blank=True)
    platforms = models.JSONField(default=list, blank=True)
    requirements = models.JSONField(default=list, blank=True)
    faqs = models.JSONField(default=list, blank=True)
    related = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Product"
        verbose_name_plural = "Products"


class Service(BaseContentItem):
    included = models.JSONField(default=list, blank=True)
    process = models.JSONField(default=list, blank=True)
    audience = models.JSONField(default=list, blank=True)
    faqs = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Service"
        verbose_name_plural = "Services"


class Solution(BaseContentItem):
    benefits = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Solution"
        verbose_name_plural = "Solutions"


class Feature(BaseContentItem):
    class Meta(BaseContentItem.Meta):
        verbose_name = "Feature"
        verbose_name_plural = "Features"


class Platform(BaseContentItem):
    benefits = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Workload Platform"
        verbose_name_plural = "Workload Platforms"


class PricingPlan(BaseContentItem):
    price = models.CharField(max_length=100, blank=True, default="")
    cadence = models.CharField(max_length=100, blank=True, default="/month")
    popular = models.BooleanField(default=False)
    features = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Pricing Plan"
        verbose_name_plural = "Pricing Plans"


class FAQItem(BaseContentItem):
    question = models.TextField(blank=True, default="")
    answer = models.TextField(blank=True, default="")

    class Meta(BaseContentItem.Meta):
        verbose_name = "FAQ Item"
        verbose_name_plural = "FAQ Items"


class Testimonial(BaseContentItem):
    quote = models.TextField(blank=True, default="")
    person = models.CharField(max_length=255, blank=True, default="")
    company = models.CharField(max_length=255, blank=True, default="")
    video_url = models.TextField(blank=True, default="")
    gallery_images = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Testimonial"
        verbose_name_plural = "Testimonials"


class ResourcePost(BaseContentItem):
    read_time = models.CharField(max_length=100, blank=True, default="5 min read")
    video_url = models.TextField(blank=True, default="")
    gallery_images = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Resource / Post"
        verbose_name_plural = "Resources & Posts"


class Blog(BaseContentItem):
    author = models.CharField(max_length=255, blank=True, default="")
    gallery_images = models.JSONField(default=list, blank=True)

    class Meta(BaseContentItem.Meta):
        verbose_name = "Blog"
        verbose_name_plural = "Blogs"


class Lead(models.Model):
    STATUS_CHOICES = [
        ("new", "New"),
        ("contacted", "Contacted"),
        ("qualified", "Qualified"),
        ("closed", "Closed"),
    ]
    TYPE_CHOICES = [
        ("contact", "Contact"),
        ("demo", "Demo"),
        ("trial", "Trial"),
        ("quote", "Quote"),
    ]
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    type = models.CharField(max_length=50, default="contact", choices=TYPE_CHOICES)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    company = models.CharField(max_length=255, blank=True, default="")
    message = models.TextField(blank=True, default="")
    status = models.CharField(max_length=50, default="new", choices=STATUS_CHOICES)
    notes = models.TextField(blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.email}) - {self.type}"


class NewsletterSubscriber(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.email


class MediaItem(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    name = models.CharField(max_length=255)
    url = models.TextField()
    type = models.CharField(max_length=100, default="image/jpeg")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.name


class SiteSettings(models.Model):
    company_name = models.CharField(max_length=255, default="Micronics Devlon")
    tagline = models.CharField(max_length=500, blank=True, default="Enterprise Backup, Disaster Recovery & Data Protection")
    contact_email = models.EmailField(blank=True, default="hello@micronicsdevlon.com")
    phone = models.CharField(max_length=100, blank=True, default="+1 (555) 014-2026")
    address = models.TextField(blank=True, default="Los Angeles, CA")
    footer_text = models.TextField(blank=True, default="Resilient backup operations for modern infrastructure.")
    privacy_policy = models.TextField(blank=True, default="")
    terms_of_service = models.TextField(blank=True, default="")
    hero_sources = models.JSONField(default=list, blank=True)
    hero_destinations = models.JSONField(default=list, blank=True)
    brand_logo = models.TextField(blank=True, default="")
    brand_logo_size = models.PositiveIntegerField(default=36)
    brand_name = models.CharField(max_length=255, blank=True, default="Micronics Devlon")
    brand_subtitle = models.CharField(max_length=255, blank=True, default="Data Protection")
    default_theme = models.CharField(max_length=20, default="light", choices=[("light", "Light"), ("dark", "Dark"), ("system", "System")])
    maintenance_mode = models.BooleanField(default=False)
    socials = models.JSONField(default=list, blank=True)

    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"

    def __str__(self):
        return self.company_name

    @classmethod
    def get_settings(cls):
        settings, _ = cls.objects.get_or_create(id=1)
        return settings


class AdminUser(models.Model):
    ROLE_CHOICES = [
        ("Owner", "Owner"),
        ("Admin", "Admin"),
        ("Editor", "Editor"),
        ("Viewer", "Viewer"),
    ]
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=50, default="Admin", choices=ROLE_CHOICES)
    active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} <{self.email}> ({self.role})"


class ActivityLogItem(models.Model):
    id = models.CharField(max_length=100, primary_key=True, default=generate_id)
    actor = models.CharField(max_length=255, default="Admin")
    action = models.CharField(max_length=255)
    target = models.CharField(max_length=500, blank=True, default="")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.actor} - {self.action} - {self.target}"
