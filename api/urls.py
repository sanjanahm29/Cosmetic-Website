from django.urls import path
from .views import (
    ShopHealthCheckView,
    CategoryListView,
    ProductListView,
    ProductDetailView,
    OrderCreateView,
    OrderDetailView,
)

urlpatterns = [
    path('health/', ShopHealthCheckView.as_view(), name='api-health'),
    path('categories/', CategoryListView.as_view(), name='category-list'),
    path('products/', ProductListView.as_view(), name='product-list'),
    path('products/<int:id>/', ProductDetailView.as_view(), name='product-detail'),
    path('orders/', OrderCreateView.as_view(), name='order-create'),
    path('orders/<int:id>/', OrderDetailView.as_view(), name='order-detail'),
]
