export interface IDiscount {
    id: number;
    date: string,
    name: string,
    title: string,
    description: string;
    imagePath: string;
}

export interface IDiscountRequest {
    date: string,
    name: string,
    title: string,
    description: string;
    imagePath: string;
}

export interface IDiscountResponse extends IDiscountRequest {
    id: number;
}