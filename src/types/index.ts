export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: string[];
}

export interface CartItem extends Product {
    quantity: number;
}

export interface AuthState {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
}

export interface CartState {
    items: CartItem[];
}
