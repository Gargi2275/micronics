from django.urls import path
from . import views

urlpatterns = [
    path("app-data/", views.get_app_data, name="app-data"),
    path("content/<str:content_type>/", views.content_collection_view, name="content-collection"),
    path("content/<str:content_type>/<str:item_id>/", views.content_item_view, name="content-item"),
    path("leads/", views.leads_view, name="leads"),
    path("leads/<str:item_id>/", views.lead_item_view, name="lead-item"),
    path("newsletter/", views.newsletter_view, name="newsletter"),
    path("newsletter/<str:item_id>/", views.newsletter_item_view, name="newsletter-item"),
    path("media/", views.media_view, name="media"),
    path("media/<str:item_id>/", views.media_item_view, name="media-item"),
    path("settings/", views.settings_view, name="settings"),
    path("users/", views.users_view, name="users"),
    path("activity/", views.activity_view, name="activity"),
    path("auth/login/", views.login_view, name="auth-login"),
]
