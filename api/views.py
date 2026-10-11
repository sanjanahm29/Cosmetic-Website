from django.db.models import Q
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Category, Product, Order
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    OrderSerializer,
)


class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class ProductListView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.select_related('category').all()
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        featured = self.request.query_params.get('featured')
        sort = self.request.query_params.get('sort')

        if category and category.lower() != 'all':
            queryset = queryset.filter(
                Q(category__slug=category) | Q(category__name__iexact=category)
            )

        if search:
            queryset = queryset.filter(
                Q(name__icontains=search) |
                Q(description__icontains=search) |
                Q(ingredients__icontains=search) |
                Q(category__name__icontains=search)
            )

        if featured == 'true':
            queryset = queryset.filter(is_featured=True)

        if sort == 'price_low':
            queryset = queryset.order_by('price')
        elif sort == 'price_high':
            queryset = queryset.order_by('-price')
        elif sort == 'rating':
            queryset = queryset.order_by('-rating')
        elif sort == 'popular':
            queryset = queryset.order_by('-review_count')
        else:
            queryset = queryset.order_by('-created_at')

        return queryset


class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.select_related('category').all()
    serializer_class = ProductSerializer
    lookup_field = 'id'


class OrderCreateView(generics.CreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        order = serializer.save()
        output_serializer = OrderSerializer(order, context={'request': request})
        return Response(output_serializer.data, status=status.HTTP_201_CREATED)


class OrderDetailView(generics.RetrieveAPIView):
    queryset = Order.objects.prefetch_related('items').all()
    serializer_class = OrderSerializer
    lookup_field = 'id'


class ShopHealthCheckView(APIView):
    def get(self, request):
        return Response({
            'status': 'healthy',
            'app': 'LUMEN Aesthetic Cosmetics API',
            'version': '1.0.0',
            'products_count': Product.objects.count(),
            'categories_count': Category.objects.count(),
            'orders_count': Order.objects.count(),
        })
