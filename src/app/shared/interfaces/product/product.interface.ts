export interface IProduct {
    id: number;
    category: string,
    name: string,
    ingredients: string,
    weight: string;
    price: string;
    path: string;
    imagePath: string;
}

export interface IProductRequest {
    category: string,
    name: string,
    ingredients: string,
    weight: string;
    price: string;
    path: string;
    imagePath: string;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}