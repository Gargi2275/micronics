from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.utils.text import slugify as django_slugify
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
from .serializers import (
    HeroSlideSerializer,
    ProductSerializer,
    ServiceSerializer,
    SolutionSerializer,
    FeatureSerializer,
    PlatformSerializer,
    PricingPlanSerializer,
    FAQItemSerializer,
    TestimonialSerializer,
    ResourcePostSerializer,
    BlogSerializer,
    LeadSerializer,
    NewsletterSubscriberSerializer,
    MediaItemSerializer,
    SiteSettingsSerializer,
    AdminUserSerializer,
    ActivityLogItemSerializer,
)

CONTENT_TYPE_MAP = {
    "heroSlides": (HeroSlide, HeroSlideSerializer),
    "products": (Product, ProductSerializer),
    "services": (Service, ServiceSerializer),
    "solutions": (Solution, SolutionSerializer),
    "features": (Feature, FeatureSerializer),
    "platforms": (Platform, PlatformSerializer),
    "pricingPlans": (PricingPlan, PricingPlanSerializer),
    "faqs": (FAQItem, FAQItemSerializer),
    "testimonials": (Testimonial, TestimonialSerializer),
    "posts": (ResourcePost, ResourcePostSerializer),
    "blogs": (Blog, BlogSerializer),
}


def log_activity(actor="Demo Admin", action="Updated", target="Content"):
    try:
        ActivityLogItem.objects.create(actor=actor, action=action, target=target)
    except Exception:
        pass


@api_view(["GET"])
@permission_classes([AllowAny])
def get_app_data(request):
    """
    Returns full AppData snapshot matching TypeScript AppData interface.
    """
    settings = SiteSettings.get_settings()

    data = {
        "heroSlides": HeroSlideSerializer(HeroSlide.objects.all(), many=True).data,
        "products": ProductSerializer(Product.objects.all(), many=True).data,
        "services": ServiceSerializer(Service.objects.all(), many=True).data,
        "solutions": SolutionSerializer(Solution.objects.all(), many=True).data,
        "features": FeatureSerializer(Feature.objects.all(), many=True).data,
        "platforms": PlatformSerializer(Platform.objects.all(), many=True).data,
        "pricingPlans": PricingPlanSerializer(PricingPlan.objects.all(), many=True).data,
        "faqs": FAQItemSerializer(FAQItem.objects.all(), many=True).data,
        "testimonials": TestimonialSerializer(Testimonial.objects.all(), many=True).data,
        "posts": ResourcePostSerializer(ResourcePost.objects.all(), many=True).data,
        "blogs": BlogSerializer(Blog.objects.all(), many=True).data,
        "leads": LeadSerializer(Lead.objects.all(), many=True).data,
        "newsletter": NewsletterSubscriberSerializer(NewsletterSubscriber.objects.all(), many=True).data,
        "media": MediaItemSerializer(MediaItem.objects.all(), many=True).data,
        "settings": SiteSettingsSerializer(settings).data,
        "users": AdminUserSerializer(AdminUser.objects.all(), many=True).data,
        "activity": ActivityLogItemSerializer(ActivityLogItem.objects.all()[:150], many=True).data,
    }
    return Response(data)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def content_collection_view(request, content_type):
    if content_type not in CONTENT_TYPE_MAP:
        return Response({"error": f"Unknown content type: {content_type}"}, status=status.HTTP_400_BAD_REQUEST)

    model_class, serializer_class = CONTENT_TYPE_MAP[content_type]

    if request.method == "GET":
        items = model_class.objects.all()
        return Response(serializer_class(items, many=True).data)

    if request.method == "POST":
        payload = request.data.copy()
        raw_id = payload.get("id")
        item_id = str(raw_id).strip() if raw_id and str(raw_id).strip() else None

        if not item_id:
            import uuid
            item_id = f"{content_type}-{uuid.uuid4()}"
            payload["id"] = item_id

        # Auto slugify if missing
        if "slug" not in payload or not payload["slug"]:
            title = payload.get("title", "")
            payload["slug"] = django_slugify(title) or "item"

        instance = model_class.objects.filter(id=item_id).first()
        is_created = instance is None

        serializer = serializer_class(instance, data=payload, partial=True) if instance else serializer_class(data=payload)

        if serializer.is_valid():
            saved_instance = serializer.save()
            action_name = "Created" if is_created else "Edited"
            target_name = getattr(saved_instance, "title", str(saved_instance.id))
            log_activity(actor="Demo Admin", action=action_name, target=f"{content_type}: {target_name}")
            return Response(serializer.data, status=status.HTTP_201_CREATED if is_created else status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PUT", "PATCH", "DELETE"])
@permission_classes([AllowAny])
def content_item_view(request, content_type, item_id):
    if content_type not in CONTENT_TYPE_MAP:
        return Response({"error": f"Unknown content type: {content_type}"}, status=status.HTTP_400_BAD_REQUEST)

    model_class, serializer_class = CONTENT_TYPE_MAP[content_type]
    instance = model_class.objects.filter(id=item_id).first()
    if not instance:
        return Response({"error": "Item not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(serializer_class(instance).data)

    if request.method in ["PUT", "PATCH"]:
        serializer = serializer_class(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            log_activity(actor="Demo Admin", action="Edited", target=f"{content_type}: {instance.title if hasattr(instance, 'title') else item_id}")
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        title = getattr(instance, "title", item_id)
        instance.delete()
        log_activity(actor="Demo Admin", action="Deleted", target=f"{content_type}: {title}")
        return Response({"status": "deleted", "id": item_id})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def leads_view(request):
    if request.method == "GET":
        return Response(LeadSerializer(Lead.objects.all(), many=True).data)

    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        lead = serializer.save()
        log_activity(actor="Visitor", action="Captured lead", target=f"{lead.type}: {lead.email}")
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([AllowAny])
def lead_item_view(request, item_id):
    lead = Lead.objects.filter(id=item_id).first()
    if not lead:
        return Response({"error": "Lead not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == "GET":
        return Response(LeadSerializer(lead).data)

    if request.method == "PATCH":
        serializer = LeadSerializer(lead, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            log_activity(actor="Demo Admin", action="Updated lead", target=lead.id)
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "DELETE":
        lead.delete()
        log_activity(actor="Demo Admin", action="Deleted lead", target=item_id)
        return Response({"status": "deleted", "id": item_id})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def newsletter_view(request):
    if request.method == "GET":
        return Response(NewsletterSubscriberSerializer(NewsletterSubscriber.objects.all(), many=True).data)

    email = request.data.get("email", "").strip().lower()
    if not email:
        return Response({"error": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)

    subscriber, created = NewsletterSubscriber.objects.get_or_create(email=email)
    if created:
        log_activity(actor="Visitor", action="Added newsletter subscriber", target=email)
    return Response(NewsletterSubscriberSerializer(subscriber).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([AllowAny])
def newsletter_item_view(request, item_id):
    sub = NewsletterSubscriber.objects.filter(id=item_id).first()
    if sub:
        sub.delete()
    return Response({"status": "deleted", "id": item_id})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def media_view(request):
    if request.method == "GET":
        return Response(MediaItemSerializer(MediaItem.objects.all(), many=True).data)

    serializer = MediaItemSerializer(data=request.data)
    if serializer.is_valid():
        media = serializer.save()
        log_activity(actor="Demo Admin", action="Uploaded", target=media.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([AllowAny])
def media_item_view(request, item_id):
    media = MediaItem.objects.filter(id=item_id).first()
    if media:
        media_name = media.name
        media.delete()
        log_activity(actor="Demo Admin", action="Deleted media", target=media_name)
    return Response({"status": "deleted", "id": item_id})


@api_view(["GET", "POST", "PUT"])
@permission_classes([AllowAny])
def settings_view(request):
    settings = SiteSettings.get_settings()
    if request.method == "GET":
        return Response(SiteSettingsSerializer(settings).data)

    serializer = SiteSettingsSerializer(settings, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        log_activity(actor="Demo Admin", action="Updated", target="Site settings")
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def users_view(request):
    if request.method == "GET":
        return Response(AdminUserSerializer(AdminUser.objects.all(), many=True).data)

    # Could be replace array or add single user
    if isinstance(request.data, list):
        AdminUser.objects.all().delete()
        created_list = []
        for u in request.data:
            s = AdminUserSerializer(data=u)
            if s.is_valid():
                created_list.append(s.save())
        log_activity(actor="Demo Admin", action="Updated", target="Users and roles")
        return Response(AdminUserSerializer(created_list, many=True).data)

    serializer = AdminUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        log_activity(actor="Demo Admin", action="Added user", target=user.name)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def activity_view(request):
    items = ActivityLogItem.objects.all()[:150]
    return Response(ActivityLogItemSerializer(items, many=True).data)


@api_view(["POST"])
@permission_classes([AllowAny])
def login_view(request):
    email = request.data.get("email", "").strip()
    password = request.data.get("password", "")

    # Check hardcoded demo admin or Django superuser
    if email == "admin@micronicsdevlon.com" and password == "Admin123!":
        return Response({
            "success": True,
            "user": {
                "name": "Admin Lead",
                "email": email,
                "role": "Owner",
            }
        })

    # Also check against standard Django auth user
    user = authenticate(username=email, password=password)
    if not user:
        # maybe username is user's username
        from django.contrib.auth.models import User
        u = User.objects.filter(email=email).first()
        if u:
            user = authenticate(username=u.username, password=password)

    if user and user.is_active:
        return Response({
            "success": True,
            "user": {
                "name": user.get_full_name() or user.username,
                "email": user.email or email,
                "role": "Owner" if user.is_superuser else "Admin",
            }
        })

    return Response({"success": False, "error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)
