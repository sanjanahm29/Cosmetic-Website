import os
import django
import json

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.test import Client

client = Client()

print("1. Testing Health API:")
res = client.get('/api/health/')
print("Status:", res.status_code, "Data:", res.json())
assert res.status_code == 200

print("\n2. Testing Categories API:")
res = client.get('/api/categories/')
print("Status:", res.status_code, "Found categories:", len(res.json()))
assert res.status_code == 200

print("\n3. Testing Products List API:")
res = client.get('/api/products/')
print("Status:", res.status_code, "Found products:", len(res.json()))
assert res.status_code == 200

print("\n4. Testing Category Filtering (?category=skincare):")
res = client.get('/api/products/?category=skincare')
print("Status:", res.status_code, "Filtered products count:", len(res.json()))
assert res.status_code == 200

print("\n5. Testing Product Detail API (/api/products/1/):")
res = client.get('/api/products/1/')
print("Status:", res.status_code, "Product Name:", res.json().get('name'))
assert res.status_code == 200

print("\n6. Testing Order Submission API (/api/orders/):")
order_payload = {
    "customer_name": "Sophia Lauren",
    "customer_email": "sophia@example.com",
    "customer_phone": "+1 555 987 6543",
    "delivery_address": "1200 Avenue of the Americas, Suite 1500",
    "city": "New York",
    "postal_code": "10036",
    "notes": "Fragile beauty products, ring bell",
    "total_amount": "2499.00",
    "items_data": [
        {
            "product_id": 1,
            "product_name": "LUMEN Amber Rose Peptide Serum",
            "quantity": 1,
            "price": "2499.00"
        }
    ]
}

res = client.post('/api/orders/', data=json.dumps(order_payload), content_type='application/json')
print("Status:", res.status_code, "Order ID created:", res.json().get('id'))
assert res.status_code == 201

print("\nAll Backend REST API tests passed successfully!")
