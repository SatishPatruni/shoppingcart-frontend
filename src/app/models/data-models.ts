import { ProductService } from "../services/product/product.service";

export class User {
    user_id: number;
    user_name: string;
    password: string;
    display_name: string;
    first_name: string;
    last_name: string;
}

export class Product {
    id: number;
    product_id: string;
    name: string;
    description: string;
    price: number;
}

export class OrderProduct{
    count: number;
    product: Product
}

export class Order {
    order_id: number;
    payment_provider_id: string;
    order_products: OrderProduct[];
}

export class CartProductInfo {
    name: string;
    count: number;
    price: number;
}

export class RazorPayPrefill {
    name: string;
    email: string;
    contact: string;
}

export class RazorPayOptions {
    key: string;
    amount: number;
    name: string;
    description: string;
    order_id: string;
    handler: any;
    prefill: RazorPayPrefill;
}
