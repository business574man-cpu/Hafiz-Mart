
import React from 'react';
// Fix: Corrected module path.
import type { Category, Product, AppSettings, Order, User, SubCategory } from './types';

export const CATEGORIES: Category[] = [
    { id: 5, name: "Cosmetics", icon: <span>💄</span> },
    { id: 1, name: "Women's Unstitched", icon: <span>👚</span> },
    { id: 2, name: "Women's Stitched", icon: <span>👗</span> },
    { id: 6, name: "Men's Unstitched", icon: <span>👕</span> },
    { id: 7, name: "Men's Stitched", icon: <span>👔</span> },
    { id: 10, name: "Kids Clothing", icon: <span>👧</span> },
    { id: 11, name: "Women's Handbags", icon: <span>👜</span> },
    { id: 3, name: "Home Essentials", icon: <span>🛋️</span> },
    { id: 4, name: "Kitchenware", icon: <span>🍳</span> },
    { id: 8, name: "Women's Shawls", icon: <span>🧣</span> },
    { id: 9, name: "Men's Shawls", icon: <span>🧣</span> },
    { id: 12, name: "Jewellery", icon: <span>💍</span> },
    { id: 13, name: "Auto & Bike Accessories", icon: <span>🏍️</span> },
    { id: 14, name: "Home Linen", icon: <span>🧺</span> },
    { id: 15, name: "Bedding", icon: <span>🛏️</span> },
    { id: 16, name: "Women Undergarments", icon: <span>👙</span> },
    { id: 17, name: "Islamic Accessories", icon: <span>📿</span> },
    { id: 18, "name": "Electronic Accessories", "icon": <span>🔌</span> },
    { id: 19, name: "Electronics", icon: <span>📱</span> },
    { id: 20, name: "Home Decor", icon: <span>🖼️</span> },
    { id: 21, name: "Bags", icon: <span>🎒</span> },
    { id: 22, name: "Fashion Accessories", icon: <span>👒</span> },
    { id: 23, name: "Shoes", icon: <span>👠</span> },
    { id: 24, name: "Men's Undergarments", icon: <span>🩲</span> },
    { id: 25, name: "Festive Collection", icon: <span>🎉</span> },
    { id: 26, name: "Other", icon: <span>❓</span> },
    { id: 27, name: "Kids Accessories", icon: <span>🧸</span> },
    { id: 28, name: "Perfumes", icon: <span>🧴</span> },
    { id: 29, name: "Mother & Baby", icon: <span>👶</span> },
    { id: 30, name: "Brands", icon: <span>™️</span> },
    { id: 31, name: "Unisex Clothing", icon: <span>👕</span> },
    { id: 32, name: "Books & Stationery", icon: <span>📚</span> },
    { id: 33, name: "Fitness", icon: <span>💪</span> },
];


export const SUB_CATEGORIES: { [key: number]: SubCategory[] } = {
    // Cosmetics sub-categories removed as per user request
};


export const PRODUCTS: Product[] = [
    {
        id: 1, name: "Premium Wireless Earbuds with Noise Cancellation", description: "Experience crystal-clear audio and deep bass with these sleek, comfortable wireless earbuds. Perfect for music, calls, and workouts.",
        price: 3499, originalPrice: 5000, 
        reviews: [
            { id: '1-1', author: 'Ali Khan', rating: 5, comment: 'Amazing sound quality! The noise cancellation is top-notch.', date: '2023-10-26' },
            { id: '1-2', author: 'Fatima Ahmed', rating: 4, comment: 'Very comfortable and long battery life. Connects easily.', date: '2023-10-24' }
        ],
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', 'https://images.unsplash.com/photo-1618384887924-c976b6134b39?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 19, cost: 2000, isActive: true,
        videoUrl: 'https://videos.pexels.com/video-files/3214431/3214431-hd_1920_1080_25fps.mp4',
    },
    {
        id: 2, name: "Men's Classic Leather Loafers", description: "Handcrafted from genuine leather, these loafers offer timeless style and all-day comfort. A versatile addition to any wardrobe.",
        price: 5999, originalPrice: 8000, 
        reviews: [
            { id: '2-1', author: 'Bilal Chaudhry', rating: 5, comment: 'Perfect fit and superb quality. Highly recommended.', date: '2023-09-15' }
        ],
        images: ['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?q=80&w=1931&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 23, cost: 4500, isActive: true,
    },
    {
        id: 3, name: "Smart Watch with Heart Rate Monitor & GPS", description: "Stay connected and track your fitness goals with this feature-packed smartwatch. Compatible with both Android and iOS.",
        price: 8999, 
        reviews: [
             { id: '3-1', author: 'Ayesha Malik', rating: 5, comment: 'Feature-packed and looks great. The battery lasts for days!', date: '2023-11-01' },
             { id: '3-2', author: 'Saad Hasan', rating: 4, comment: 'Good for tracking workouts, but the app could be better.', date: '2023-10-29' }
        ],
        images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 19, cost: 6000, isActive: true,
    },
    {
        id: 4, name: "Modern Minimalist Wooden Desk Lamp", description: "Illuminate your workspace with this elegant and functional desk lamp. Made from sustainably sourced wood.",
        price: 2500, originalPrice: 3500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1915&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 20, cost: 1500, isActive: true,
    },
    {
        id: 5, name: "Organic Extra Virgin Olive Oil - 500ml", description: "Cold-pressed and rich in antioxidants, this premium olive oil is perfect for salads, cooking, and dipping.",
        price: 1200, 
        reviews: [
            { id: '5-1', author: 'Nida Kazmi', rating: 5, comment: 'Excellent quality and taste. Will buy again.', date: '2023-10-20' }
        ],
        images: ['https://images.unsplash.com/photo-16262013523132-92c53300491e?q=80&w=1974&auto=format&fit=crop'],
        sellerLocation: "Faisalabad", categoryId: 26, cost: 800, isActive: true,
    },
    {
        id: 6, name: "Professional Gaming Mouse with RGB Lighting", description: "Gain a competitive edge with this ergonomic gaming mouse, featuring customizable buttons and vibrant RGB effects.",
        price: 4500, originalPrice: 6000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1563297007-1e891ac2af75?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 18, cost: 3000, isActive: true,
    },
    {
        id: 7, name: "Elegant Floral Print Summer Dress", description: "Stay cool and stylish in this lightweight and breathable summer dress, perfect for any casual occasion.",
        price: 3200, 
        reviews: [
            { id: '7-1', author: 'Sana Javed', rating: 4, comment: 'Beautiful dress, the fabric is very light and comfortable.', date: '2023-08-05' }
        ],
        images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 2, cost: 2000, isActive: true,
    },
     {
        id: 8, name: "HD 1080p Webcam with Built-in Microphone", description: "Perfect for video conferencing and streaming, this webcam delivers sharp, smooth video and clear audio.",
        price: 2800, originalPrice: 4000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1616421394435-0870713354e?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 18, cost: 1800, isActive: true,
    },
    {
        id: 6074606, name: "2 in 1 Eyebrow Trimmer & Hair Shaver", description: "A rechargeable and portable device for precise eyebrow shaping and facial hair removal.",
        price: 1250, 
        reviews: [],
        images: ['https://i.imgur.com/kPlS2Fj.png'],
        sellerLocation: "Sialkot", categoryId: 5, cost: 750, isActive: true,
    },
    {
        id: 10, name: "Luxury Silk Scarf for Women", description: "A beautifully crafted 100% pure silk scarf, featuring a vibrant floral pattern. Lightweight and elegant.",
        price: 2800, originalPrice: 4000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?q=80&w=2069&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 8, cost: 1500, isActive: true,
    },
    {
        id: 11, name: "Stainless Steel Chef's Knife - 8 Inch", description: "High-carbon stainless steel blade for precision and accuracy. Ergonomic handle provides comfort and control.",
        price: 3200, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1614329240902-3c66395b00e9?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Sialkot", categoryId: 4, cost: 2000, isActive: true,
    },
    {
        id: 12, name: "Vintage Leather Backpack", description: "A stylish and durable backpack for daily use, with multiple compartments for laptops and accessories.",
        price: 6500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1553062407-98eeb6e0e937?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 21, cost: 4500, isActive: true,
    },
    {
        id: 13, name: "Men's Cotton Checkered Shirt", description: "A classic fit, long-sleeve shirt made from soft, breathable cotton. Perfect for casual or semi-formal wear.",
        price: 2200, originalPrice: 3000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Faisalabad", categoryId: 7, cost: 1500, isActive: true,
    },
    {
        id: 14, name: "Non-stick Frying Pan Set (3 Pieces)", description: "Durable, scratch-resistant non-stick coating for healthy cooking. Includes 8-inch, 10-inch, and 12-inch pans.",
        price: 4800, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1593281008134-3c6b4859a1c2?q=80&w=1964&auto=format&fit=crop'],
        sellerLocation: "Gujranwala", categoryId: 4, cost: 3200, isActive: true,
    },
    {
        id: 15, name: "Portable Bluetooth Speaker", description: "Compact and powerful speaker with up to 12 hours of playtime. Waterproof and dustproof design.",
        price: 5500, originalPrice: 7000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1589100723335-ebb727676a0a?q=80&w=1974&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 19, cost: 3500, isActive: true,
    },
    {
        id: 16, name: "Scented Soy Wax Candle", description: "Hand-poured candle with natural essential oils. Creates a relaxing and aromatic ambiance in any room.",
        price: 1500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1614531334085-28828b34e55d?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 20, cost: 900, isActive: true,
    },
    {
        id: 17, name: "Kids' Educational Tablet", description: "A fun and interactive learning tablet for kids aged 3-7. Pre-loaded with educational games and apps.",
        price: 7500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1565299484832-688b1334c919?q=80&w=1936&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 10, cost: 5000, isActive: true,
    },
    {
        id: 18, name: "Yoga Mat with Carrying Strap", description: "High-density, non-slip mat for yoga and fitness. Lightweight and easy to carry.",
        price: 2100, originalPrice: 2800, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1591291621235-9152b04f7628?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 33, cost: 1400, isActive: true,
    },
    {
        id: 19, name: "Ceramic Coffee Mug Set (4 Mugs)", description: "Set of four 350ml ceramic mugs, perfect for coffee, tea, and hot chocolate. Microwave and dishwasher safe.",
        price: 2500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1617886942423-255b6e759244?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Multan", categoryId: 4, cost: 1600, isActive: true,
    },
    {
        id: 20, name: "USB-C to HDMI Adapter", description: "Connect your USB-C laptop or phone to an HDMI display. Supports 4K resolution at 60Hz.",
        price: 1800, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1585592430294-fa6033f5a7a9?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 18, cost: 1100, isActive: true,
    },
    {
        id: 21, name: "Women's Embroidered Lawn Suit (Unstitched)", description: "Elegant 3-piece unstitched lawn suit with intricate embroidery. Perfect for festive occasions.",
        price: 3800, originalPrice: 5000, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1609252809458-5a82e5b8d2a1?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Faisalabad", categoryId: 1, cost: 2500, isActive: true,
    },
    {
        id: 22, name: "Car Phone Mount Holder", description: "Universal car mount with a strong suction cup and adjustable arm. Fits most smartphones.",
        price: 1300, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1616979691942-7c3d2a0a2f9b?q=80&w=1974&auto=format&fit=crop'],
        sellerLocation: "Rawalpindi", categoryId: 13, cost: 800, isActive: true,
    },
    {
        id: 23, name: "Plush Velvet Cushion Covers (Set of 2)", description: "Add a touch of luxury to your living space with these soft and durable cushion covers. Size: 18x18 inches.",
        price: 1600, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1596423403432-094709a324b1?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 14, cost: 1000, isActive: true,
    },
    {
        id: 24, name: "Vitamin C Face Serum", description: "Brightening and anti-aging serum with Vitamin C and Hyaluronic Acid. Helps reduce dark spots and wrinkles.",
        price: 1900, originalPrice: 2500, 
        reviews: [],
        images: ['https://images.unsplash.com/photo-1620916566398-39f168a7673b?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 5, cost: 1200, isActive: true,
    },
    {
        id: 25, name: "Men's Stitched Kurta", description: "Fine cotton stitched kurta for men, perfect for festive occasions and casual wear.",
        price: 2999, originalPrice: 4000,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1633215882193-1b555776d2e6?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 7, cost: 2000, isActive: true
    },
    {
        id: 26, name: "Kids' Denim Jacket", description: "Stylish and comfortable denim jacket for kids. A perfect layering piece for all seasons.",
        price: 1800,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1591047139829-d919b5ca2373?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 10, cost: 1200, isActive: true
    },
    {
        id: 27, name: "Women's Leather Tote Bag", description: "Spacious and elegant leather tote bag, perfect for work or casual outings.",
        price: 7500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Sialkot", categoryId: 11, cost: 5500, isActive: true
    },
    {
        id: 28, name: "Silver Jhumka Earrings", description: "Traditional oxidized silver jhumka earrings with intricate detailing.",
        price: 2200,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1611652033952-de3757ee523f?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Multan", categoryId: 12, cost: 1500, isActive: true
    },
    {
        id: 29, name: "Motorcycle Helmet (DOT Approved)", description: "Full-face motorcycle helmet with durable shell and comfortable padding. DOT certified for safety.",
        price: 4500, originalPrice: 6000,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1590152393229-018f97463a55?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Rawalpindi", categoryId: 13, cost: 3200, isActive: true
    },
    {
        id: 30, name: "Egyptian Cotton Towel Set", description: "Ultra-soft and absorbent 6-piece towel set made from 100% Egyptian cotton.",
        price: 3800,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1592910136211-a864bb08a48c?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Faisalabad", categoryId: 14, cost: 2800, isActive: true
    },
    {
        id: 31, name: "Quilted Comforter Set (King Size)", description: "Cozy and warm quilted comforter set with 2 pillow shams. Reversible design.",
        price: 8500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1582582494705-5375b3c66579?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 15, cost: 6000, isActive: true
    },
    {
        id: 32, name: "Lace Bralette Set", description: "Elegant and comfortable lace bralette and panty set. Perfect for special occasions.",
        price: 1900,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1610481243577-155ff73737a3?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 16, cost: 1200, isActive: true
    },
    {
        id: 33, name: "Digital Tasbeeh Counter", description: "Compact and easy-to-use digital tasbeeh counter with a clear LCD display.",
        price: 500, originalPrice: 700,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1587398183103-e18b1393698b?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 17, cost: 300, isActive: true
    },
    {
        id: 34, name: "Power Bank 20000mAh", description: "High-capacity power bank with fast charging support. Can charge two devices simultaneously.",
        price: 4200,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1588622146633-20b085609335?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 18, cost: 2800, isActive: true
    },
    {
        id: 35, name: "Wall Art Canvas Prints (Set of 3)", description: "Modern abstract canvas prints to beautify your living room or office space.",
        price: 3500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1945&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 20, cost: 2200, isActive: true
    },
    {
        id: 36, name: "Leather Wallet for Men", description: "Genuine leather bifold wallet with multiple card slots and a coin pocket.",
        price: 1800, originalPrice: 2500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1618519409346-a4c4a4f1b8c6?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Sialkot", categoryId: 22, cost: 1100, isActive: true
    },
    {
        id: 37, name: "Men's Sports Sneakers", description: "Lightweight and breathable sneakers for running and gym workouts. Provides excellent grip and comfort.",
        price: 4800,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 23, cost: 3200, isActive: true
    },
    {
        id: 38, name: "Men's Cotton Boxers (Pack of 3)", description: "Soft and comfortable 100% cotton boxers with an elastic waistband.",
        price: 1500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1621335832690-9b165d75949d?q=80&w=1964&auto=format&fit=crop'],
        sellerLocation: "Faisalabad", categoryId: 24, cost: 1000, isActive: true
    },
    {
        id: 39, name: "French Perfume for Women (100ml)", description: "An elegant and long-lasting fragrance with floral and woody notes.",
        price: 5500,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1585399001829-d7c71bab3110?q=80&w=1887&auto=format&fit=crop'],
        sellerLocation: "Islamabad", categoryId: 28, cost: 3800, isActive: true
    },
    {
        id: 40, name: "Baby Diaper Bag", description: "A multi-functional and spacious diaper bag with insulated pockets and changing pad.",
        price: 3200,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1605310221334-02378873c153?q=80&w=1964&auto=format&fit=crop'],
        sellerLocation: "Karachi", categoryId: 29, cost: 2100, isActive: true
    },
    {
        id: 41, name: "Resistance Bands Set (5 Levels)", description: "A set of 5 resistance bands for home workouts, physiotherapy, and strength training.",
        price: 1600,
        reviews: [],
        images: ['https://images.unsplash.com/photo-1599581128242-a46c5a153236?q=80&w=1964&auto=format&fit=crop'],
        sellerLocation: "Lahore", categoryId: 33, cost: 1000, isActive: true
    }
];

export const INITIAL_APP_SETTINGS: AppSettings = {
    general: {
        siteTitle: "Hafiz Mart",
        contactNumber: "+92-344-5718795"
    },
    banners: {
        images: [
            'https://plus.unsplash.com/premium_photo-1683758342891-acd4915594b2?q=80&w=1974&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop'
        ]
    },
    payment: {
        isCodEnabled: true,
        isEasypaisaEnabled: true,
        isJazzCashEnabled: false,
        isCardPaymentEnabled: false,
        baseShipping: 150,
        codSurcharge: 50
    },
    threeDBanner: {
      isEnabled: true,
      headline: "New Arrivals",
      title: "Discover the Future of Tech",
      description: "Explore our latest collection of smart gadgets designed to elevate your lifestyle.",
      buttonText: "Shop Now",
      imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1964&auto=format&fit=crop",
      linkCategoryId: 19 // Corresponds to 'Electronics'
    }
};

export const PAKISTANI_CITIES_AND_AREAS: { [key: string]: string[] } = {
    "Karachi": ["Clifton", "Defence (DHA)", "Gulshan-e-Iqbal", "Tariq Road", "Saddar", "North Nazimabad", "Federal B. Area", "PECHS", "Korangi", "Malir", "Landhi", "Bahria Town Karachi"],
    "Lahore": ["Model Town", "Johar Town", "DHA (All Phases)", "Gulberg", "Bahria Town Lahore", "Cantt", "Wapda Town", "Allama Iqbal Town", "Faisal Town", "Garden Town", "Samanabad"],
    "Islamabad": ["F-5", "F-6", "F-7", "F-8", "F-10", "F-11", "G-5", "G-6", "G-7", "G-8", "G-9", "G-10", "G-11", "G-13", "I-8", "I-9", "I-10", "E-11", "Bahria Enclave", "DHA Islamabad"],
    "Rawalpindi": ["Saddar", "Bahria Town (All Phases)", "Satellite Town", "Chaklala Scheme 3", "Westridge", "Adiala Road", "Cantt", "Morgah"],
    "Faisalabad": ["Madina Town", "Peoples Colony", "Jinnah Colony", "Gulberg", "Kohinoor City", "Samanabad", "D-Ground"],
    "Peshawar": ["Hayatabad", "University Town", "Cantt", "Gulbahar", "Saddar", "Tehkal", "Warsak Road"],
    "Multan": ["Cantt", "DHA Multan", "Gulgasht Colony", "Shadman Colony", "Bosan Road", "Model Town", "Shah Rukn-e-Alam Colony"],
    "Hyderabad": ["Latifabad", "Qasimabad", "Saddar", "Citizen Colony", "Autobahn Road"],
    "Quetta": ["Jinnah Town", "Cantt", "Satellite Town", "Zarghoon Road", "Shahbaz Town"],
    "Gujranwala": ["Satellite Town", "Model Town", "Cantt", "Peoples Colony", "DC Colony"],
    "Sialkot": ["Cantt", "Model Town", "City Housing", "Gohadpur", "Paris Road"],
    "Sargodha": ["Satellite Town", "Cantonment Board", "Fatima Jinnah Road", "University Road"],
    "Bahawalpur": ["Model Town", "Satellite Town", "Cantt", "DHA Bahawalpur"],
    "Sukkur": ["Military Road", "Shikarpur Road", "Bunder Road", "New Pind"],
    "Abbottabad": ["Jinnahabad", "Cantt", "Mandian", "Link Road"],
    "Mardan": ["Sheikh Maltoon Town", "Cantt", "Baghdada", "Shamsi Road"],
    "Jhelum": ["Cantt", "Civil Lines", "Model Colony", "GTS Chowk"],
    "Sheikhupura": ["Housing Colony", "Jinnah Park", "Lahore Road"],
};

export const MOCK_ORDERS: Order[] = [
    { 
        id: '5834256', 
        items: [
            {
                ...(PRODUCTS.find(p => p.id === 6074606)!),
                quantity: 1,
                size: 'Standard Size',
                profit: 500,
            }
        ], 
        address: { 
            customerName: 'Adil khawaj', 
            phoneNumber: '+923408875838', 
            whatsappNumber: '+923408875838',
            city: 'Muzaffarabad',
            area: 'Neelum continental Hotel',
            fullAddress: 'Baila Noor Shah Muzaffrabad in Neelum continental Hotel\nBaila Noor Shah,Muzaffarabad\nMashoor Jagah: Neelum continental Hotel\n+923408875838',
        }, 
        payment: { method: 'COD' }, 
        total: 1450,
        shipping: 200,
        date: new Date('2025-09-11T12:00:00Z'), 
        status: 'Returned',
        userId: 'customer@hafizmart.com',
        supplierName: 'Al huda Gadgets',
        deliveryPartner: {
            name: 'Leopards',
            logo: 'https://i.imgur.com/J8mC2B3.png'
        }
    },
    { 
        id: '5225699', 
        items: [
            {...PRODUCTS[0], quantity: 1, size: 'Standard Size', profit: 1499}, 
            {...PRODUCTS[2], quantity: 1, size: '42mm', profit: 2999}
        ], 
        address: { 
            customerName: 'Test Customer', 
            phoneNumber: '03001234567', 
            whatsappNumber: '03001234567',
            city: 'Karachi',
            area: 'Clifton',
            fullAddress: 'House 123, Street 4, Block 5',
            landmark: 'Near Boat Basin'
        }, 
        payment: { method: 'COD' }, 
        total: PRODUCTS[0].price + PRODUCTS[2].price + 200,
        shipping: 200,
        date: new Date('2023-03-15T12:00:00Z'), 
        status: 'Delivered', 
        userId: 'customer@hafizmart.com',
        supplierName: 'Gadget Zone',
        deliveryPartner: {
            name: 'TCS',
            logo: 'https://i.imgur.com/J8mC2B3.png'
        }
    }
];

export const MOCK_USERS: User[] = [
    { id: 'business574man@gmail.com', email: 'business574man@gmail.com', role: 'admin', password: 'hafiz@574', name: 'Marcus George', profilePicUrl: 'https://i.pravatar.cc/40?u=admin' },
    { id: 'customer@hafizmart.com', email: 'customer@hafizmart.com', role: 'customer', password: 'password123', name: 'Ayesha Khan' }
];
