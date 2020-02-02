import { User, Product, Order } from "./data-models";

export class BaseResponse {
    error_code: number;
}
export class LoginResponse extends BaseResponse {
    user: User;
    token: string;
}
export class ProductResponse extends BaseResponse {
    total: number;
    products: Product[];
}
export class OrderResponse extends BaseResponse {
    order: Order
}

export class PaymentOrderResponse extends BaseResponse {
    order: Order
}