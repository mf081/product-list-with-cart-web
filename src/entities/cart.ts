import { Product } from "./products"

export class Cart {
    private _products: Product[] = [];
    private _total: number = 0;
    
    get products() {
        return this._products;
    }

    get total() {
        return this._total
    }

    addToCart(product: Product) {
        this._total += product.price;
        this._products.push(product);
    }

}