import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth.models import User
from api.models import Category, Product, Order, OrderItem

def seed():
    print("--- Seeding Database ---")
    
    # 1. Superuser
    if not User.objects.filter(username='admin').exists():
        User.objects.create_superuser('admin', 'admin@lumencosmetics.com', 'admin123')
        print("Created superuser 'admin' with password 'admin123'")
    else:
        print("Superuser 'admin' already exists")

    # 2. Categories
    categories_data = [
        {
            'name': 'All Products',
            'slug': 'all',
            'description': 'Discover our entire collection of conscious minimalist beauty essentials.'
        },
        {
            'name': 'Skincare',
            'slug': 'skincare',
            'description': 'Deep hydration and barrier-restoring nourishment formulated for radiant skin.'
        },
        {
            'name': 'Serums & Oils',
            'slug': 'serums',
            'description': 'Targeted peptide and antioxidant concentrates that transform cellular vitality.'
        },
        {
            'name': 'Lip Care',
            'slug': 'lip-care',
            'description': 'Silky plant-derived lip oils and conditioning masks for plush, supple lips.'
        },
        {
            'name': 'Cleansers',
            'slug': 'cleansers',
            'description': 'Pure botanical infusions that melt away impurities without stripping moisture.'
        },
    ]

    cat_map = {}
    for cat_info in categories_data:
        cat, created = Category.objects.get_or_create(
            slug=cat_info['slug'],
            defaults={'name': cat_info['name'], 'description': cat_info['description']}
        )
        cat_map[cat.slug] = cat
        print(f"Category: {cat.name}")

    # 3. Products
    products_data = [
        {
            'name': 'LUMEN Amber Rose Peptide Serum',
            'slug': 'lumen-amber-rose-peptide-serum',
            'category': cat_map['serums'],
            'price': 2499.00,
            'original_price': 2999.00,
            'description': 'A lightweight, ultra-penetrating elixir infused with damask rose peptides, wild rosehip, and multi-molecular hyaluronic acid. Delivers continuous all-day moisture while restoring elasticity and lit-from-within radiance.',
            'ingredients': 'Aqua, Rosa Damascena Flower Distillate, Hyaluronic Acid (Multi-weight), Tripeptide-1, Niacinamide (5%), Rosa Canina (Rosehip) Seed Oil, Vegetable Glycerin, Tocopherol (Vitamin E).',
            'how_to_use': 'Warm 3 to 4 drops between clean palms and press gently into cleansed face, neck, and decolletage every morning and evening before moisturizer.',
            'volume_or_weight': '30 ml / 1.0 fl. oz.',
            'image': 'products/serum.jpg',
            'rating': 4.95,
            'review_count': 184,
            'is_featured': True,
            'is_best_seller': True,
            'stock': 45
        },
        {
            'name': 'AURA Restorative Hydration Cream',
            'slug': 'aura-restorative-hydration-cream',
            'category': cat_map['skincare'],
            'price': 1899.00,
            'original_price': 2299.00,
            'description': 'A cloud-soft barrier treatment featuring botanical squalane, fermented rice peptides, and golden oat lipids. Delivers intensive 72-hour moisture cushion that calms redness and softens texture.',
            'ingredients': 'Purified Aqua, Plant Squalane, Butyrospermum Parkii (Shea Butter), Caprylic/Capric Triglyceride, Fermented Oryza Sativa Extract, Ceramide NP, Avena Sativa (Oat) Kernel Oil.',
            'how_to_use': 'Scoop a hazelnut-sized portion onto fingertips and smooth upward over face and neck until absorbed. Ideal as a daytime prep or bedtime ritual.',
            'volume_or_weight': '50 ml / 1.7 fl. oz.',
            'image': 'products/cream.jpg',
            'rating': 4.90,
            'review_count': 142,
            'is_featured': True,
            'is_best_seller': True,
            'stock': 60
        },
        {
            'name': 'PETAL Rose Infusion Lip Treatment Oil',
            'slug': 'petal-rose-infusion-lip-oil',
            'category': cat_map['lip-care'],
            'price': 999.00,
            'original_price': 1199.00,
            'description': 'A high-shine, non-sticky lip treatment suspended with real organic botanical rose extracts and camellia seed oil. Instantly hydrates, plumps, and enriches lips with a translucent blushing glow.',
            'ingredients': 'Camellia Japonica Seed Oil, Jojoba Esters, Ricinus Communis Seed Oil, Rosa Gallica Flower Extract, Sodium Hyaluronate, Tocopherol, Natural Plant Stevia.',
            'how_to_use': 'Glide the plush cushion applicator over bare lips for an effortless mirror sheen, or layer across your favorite lip shade for amplified hydration.',
            'volume_or_weight': '10 ml / 0.34 fl. oz.',
            'image': 'products/lip_oil.jpg',
            'rating': 4.88,
            'review_count': 96,
            'is_featured': True,
            'is_best_seller': False,
            'stock': 85
        },
        {
            'name': 'BOTANICAL Gentle Nourishing Cleanser',
            'slug': 'botanical-gentle-nourishing-cleanser',
            'category': cat_map['cleansers'],
            'price': 1499.00,
            'original_price': 1799.00,
            'description': 'A pH-balanced milky gel cleanser that gently dissolves makeup, excess sebum, and pollutants while preserving your skin microbiome. Leaves complexion fresh, soft, and calm.',
            'ingredients': 'Aqua, Coco-Glucoside, Glycerin, Calendula Officinalis Flower Extract, Chamomilla Recutita Flower Water, Rosa Canina Fruit Extract, Colloidal Oatmeal, Panthenol.',
            'how_to_use': 'Massage 1-2 pumps onto damp skin with circular motions for 60 seconds. Rinse thoroughly with lukewarm water and pat gently with a clean towel.',
            'volume_or_weight': '200 ml / 6.8 fl. oz.',
            'image': 'products/cleanser.jpg',
            'rating': 4.92,
            'review_count': 110,
            'is_featured': True,
            'is_best_seller': False,
            'stock': 70
        },
        {
            'name': 'CELLULAR Youth Renewal Night Elixir',
            'slug': 'cellular-youth-renewal-night-elixir',
            'category': cat_map['serums'],
            'price': 2899.00,
            'original_price': 3499.00,
            'description': 'Concentrated nocturnal botanical repair oil formulated with Bakuchiol (gentle plant retinol alternative), prickly pear seed, and sea buckthorn oil to smooth fine lines overnight.',
            'ingredients': 'Opuntia Ficus-Indica (Prickly Pear) Seed Oil, Bakuchiol (2%), Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Squalane, Helianthus Annuus Seed Oil, Rosemary Leaf Extract.',
            'how_to_use': 'At night after cleansing and hydrating, press 2-3 drops into skin as the final sealing step of your evening ritual.',
            'volume_or_weight': '30 ml / 1.0 fl. oz.',
            'image': 'products/serum.jpg',
            'rating': 4.96,
            'review_count': 88,
            'is_featured': False,
            'is_best_seller': True,
            'stock': 30
        },
        {
            'name': 'SILK Barrier Defense Ceramide Balm',
            'slug': 'silk-barrier-defense-ceramide-balm',
            'category': cat_map['skincare'],
            'price': 1699.00,
            'original_price': None,
            'description': 'An intensive melting treatment designed for compromised skin barriers, extreme weather, or post-sun exposure. Fortified with 5 essential ceramides and gotu kola extract.',
            'ingredients': 'Ceramide EOP, Ceramide NS, Ceramide NP, Ceramide AS, Ceramide AP, Centella Asiatica Extract, Shea Butter, Phytosphingosine, Cholesterol.',
            'how_to_use': 'Apply a thin layer to targeted dry patches, sensitized zones, or over entire face for overnight nourishment.',
            'volume_or_weight': '60 ml / 2.0 fl. oz.',
            'image': 'products/cream.jpg',
            'rating': 4.87,
            'review_count': 64,
            'is_featured': False,
            'is_best_seller': False,
            'stock': 40
        },
        {
            'name': 'VELVET Dew Lip Conditioning Mask',
            'slug': 'velvet-dew-lip-conditioning-mask',
            'category': cat_map['lip-care'],
            'price': 899.00,
            'original_price': 1099.00,
            'description': 'An overnight lip cocooning mask loaded with Murumuru butter, vegan squalane, and wild berry extracts to repair cracked, dry lips and reveal soft, cushiony texture.',
            'ingredients': 'Astrocaryum Murumuru Seed Butter, Theobroma Grandiflorum (Cupuacu) Seed Butter, Euterpe Oleracea (Acai) Fruit Oil, Rubus Idaeus (Raspberry) Fruit Extract, Agave Nectar.',
            'how_to_use': 'Apply generously before bed. Can also be applied as an ultra-rich lip prep 10 minutes before lipstick.',
            'volume_or_weight': '15 g / 0.5 oz.',
            'image': 'products/lip_oil.jpg',
            'rating': 4.91,
            'review_count': 156,
            'is_featured': False,
            'is_best_seller': True,
            'stock': 95
        },
        {
            'name': 'PURIFYing Herbal Clarifying Tonic',
            'slug': 'purifying-herbal-clarifying-tonic',
            'category': cat_map['cleansers'],
            'price': 1299.00,
            'original_price': None,
            'description': 'A gentle pore-refining clarifying treatment infused with willow bark BHA, organic witch hazel, and green tea polyphenols that leaves pores looking visibly minimized.',
            'ingredients': 'Hamamelis Virginiana (Witch Hazel) Water, Salix Alba (Willow) Bark Extract, Camellia Sinensis (Green Tea) Leaf Extract, Niacinamide, Melaleuca Alternifolia Leaf Oil, Aloe Barbadensis.',
            'how_to_use': 'Pour onto a reusable cotton pad or pat directly into freshly cleansed face with fingers, morning and evening.',
            'volume_or_weight': '150 ml / 5.1 fl. oz.',
            'image': 'products/cleanser.jpg',
            'rating': 4.84,
            'review_count': 52,
            'is_featured': False,
            'is_best_seller': False,
            'stock': 55
        }
    ]

    for p in products_data:
        prod, created = Product.objects.get_or_create(
            slug=p['slug'],
            defaults=p
        )
        if not created:
            for k, v in p.items():
                setattr(prod, k, v)
            prod.save()
        print(f"Product: {prod.name} - ₹{prod.price}")

    # 4. Sample Order
    p1 = Product.objects.get(slug='lumen-amber-rose-peptide-serum')
    p2 = Product.objects.get(slug='aura-restorative-hydration-cream')
    sample_total = p1.price + p2.price

    if not Order.objects.exists():
        sample_order = Order.objects.create(
            customer_name='Ananya Sharma',
            customer_email='ananya.sharma@example.com',
            customer_phone='+91 98765 43210',
            delivery_address='42 Blossom Boulevard, Indiranagar',
            city='Bengaluru',
            postal_code='560038',
            notes='Please leave with front security gate.',
            total_amount=sample_total,
            status='confirmed'
        )
        OrderItem.objects.create(order=sample_order, product=p1, product_name=p1.name, quantity=1, price=p1.price)
        OrderItem.objects.create(order=sample_order, product=p2, product_name=p2.name, quantity=1, price=p2.price)
        print(f"Created sample order #{sample_order.id} for {sample_order.customer_name}")
    else:
        # Update existing sample orders if any to rupee prices
        for ord_obj in Order.objects.all():
            items = ord_obj.items.all()
            if items.exists():
                new_tot = sum(it.price * it.quantity for it in items)
                ord_obj.total_amount = new_tot
                ord_obj.save()

    print("--- Database Seeding Complete ---")

if __name__ == '__main__':
    seed()
