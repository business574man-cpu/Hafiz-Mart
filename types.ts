import React from 'react';

export type Page = 'home' | 'productDetail' | 'cart' | 'checkout' | 'confirmation' | 'login' | 'admin' | 'profile' | 'category' | 'orders' | 'explore' | 'about' | 'careers' | 'contact' | 'help' | 'how-to-buy' | 'privacy' | 'returns' | 'security' | 'terms';

export type Theme = 'light' | 'dark';

export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string; // ISO string
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    reviews: Review[];
    images: string[];
    sellerLocation: string;
    categoryId: number;
    cost: number;
    isActive: boolean;
    videoUrl?: string;
}

export interface CartItem extends Product {
    quantity: number;
    size?: string;
    profit?: number;
}

export interface Category {
    id: number;
    name: string;
    icon: React.ReactNode;
    image?: string;
}

export interface SubCategory {
    id: number;
    name: string;
    image: string;
}

export interface User {
    id: string;
    email: string;
    password?: string;
    role: 'admin' | 'customer';
    name: string;
    profilePicUrl?: string;
}

export interface ShippingAddress {
    customerName: string;
    phoneNumber: string;
    whatsappNumber: string;
    city: string;
    cityOther?: string; // For manual entry
    area: string;
    areaOther?: string; // For manual entry
    fullAddress: string;
    landmark?: string;
}

export type PaymentMethod = 'COD' | 'Easypaisa' | 'JazzCash' | 'Card';

export interface PaymentDetails {
    method: PaymentMethod;
    transactionId?: string;
    paymentScreenshotUrl?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Returned';

export interface DeliveryPartner {
    name: string;
    logo: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    address: ShippingAddress;
    payment: PaymentDetails;
    total: number;
    shipping: number;
    date: Date;
    status: OrderStatus;
    userId: string;
    supplierName?: string;
    deliveryPartner?: DeliveryPartner;
}

export interface Notification {
    id: number;
    message: string;
    timestamp: Date;
    read: boolean;
}

export interface PaymentSettings {
    isCodEnabled: boolean;
    isEasypaisaEnabled: boolean;
    isJazzCashEnabled: boolean;
    isCardPaymentEnabled: boolean;
    baseShipping: number;
    codSurcharge: number;
}

export interface ThreeDBannerSettings {
    isEnabled: boolean;
    headline: string;
    title: string;
    description: string;
    buttonText: string;
    imageUrl: string;
    linkCategoryId: number;
}


export interface AppSettings {
    general: {
        siteTitle: string;
        contactNumber: string;
    };
    banners: {
        images: string[];
    };
    payment: PaymentSettings;
    threeDBanner: ThreeDBannerSettings;
}


export interface ChatMessage {
    id: number;
    text: string;
    sender: 'user' | 'bot';
}

export interface AdminDashboardProps {
    products: Product[];
    orders: Order[];
    users: User[];
    onSaveProduct: (product: Product) => void;
    onDeleteProduct: (productId: number) => void;
    productDeleteSuccessMessage: string;
    currentUser: User;
    settings: AppSettings;
    categories: Category[];
    onSaveSettings: (settings: AppSettings) => void;
    onUpdateUser: (user: User) => void;
    onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
}
