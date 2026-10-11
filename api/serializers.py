from rest_framework import serializers
from django.db import transaction
from .models import Category, Product, Order, OrderItem


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description', 'product_count']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'slug',
            'category',
            'category_name',
            'category_slug',
            'price',
            'original_price',
            'description',
            'ingredients',
            'how_to_use',
            'volume_or_weight',
            'image',
            'rating',
            'review_count',
            'is_featured',
            'is_best_seller',
            'stock',
            'created_at',
        ]

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return obj.image_url or ''


class OrderItemInputSerializer(serializers.Serializer):
    product_id = serializers.IntegerField(required=False, allow_null=True)
    product_name = serializers.CharField(max_length=200)
    quantity = serializers.IntegerField(min_value=1)
    price = serializers.DecimalField(max_digits=10, decimal_places=2)


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = ['id', 'product', 'product_name', 'quantity', 'price']


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    items_data = OrderItemInputSerializer(many=True, write_only=True, required=True)

    class Meta:
        model = Order
        fields = [
            'id',
            'customer_name',
            'customer_email',
            'customer_phone',
            'delivery_address',
            'city',
            'postal_code',
            'notes',
            'total_amount',
            'status',
            'created_at',
            'items',
            'items_data',
        ]
        read_only_fields = ['id', 'status', 'created_at']

    def validate_customer_phone(self, value):
        cleaned = value.strip()
        if len(cleaned) < 7:
            raise serializers.ValidationError("Please provide a valid phone number.")
        return cleaned

    def validate_customer_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("Please provide a valid full name.")
        return cleaned

    def validate(self, attrs):
        items_data = attrs.get('items_data', [])
        if not items_data:
            raise serializers.ValidationError({"items_data": "Order must contain at least one item."})
        return attrs

    def create(self, validated_data):
        items_data = validated_data.pop('items_data')
        with transaction.atomic():
            order = Order.objects.create(**validated_data)
            for item in items_data:
                product_id = item.get('product_id')
                product = None
                if product_id:
                    try:
                        product = Product.objects.get(id=product_id)
                        # Optional stock reduction
                        if product.stock >= item['quantity']:
                            product.stock -= item['quantity']
                            product.save(update_fields=['stock'])
                    except Product.DoesNotExist:
                        product = None

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    product_name=item['product_name'],
                    quantity=item['quantity'],
                    price=item['price'],
                )
            return order
