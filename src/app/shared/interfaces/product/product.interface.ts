import { ICategoryResponse } from "../category/category.interface";

export interface IProduct {
    id: number;
    category: string,
    name: string,
    ingredients: string,
    weight: string;
    price: number;
    path: string;
    imagePath: string;
}

export interface IProductRequest {
    category: ICategoryResponse,
    name: string,
    ingredients: string,
    weight: string;
    price: number;
    path: string;
    imagePath: string;
    count: number;
}

export interface IProductResponse extends IProductRequest {
    id: number;
}