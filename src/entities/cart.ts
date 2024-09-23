import { Product } from "./product";

export class Cart {

    private _products: Product[] = [];
    private _total: number = 0;

    addToCart(product: Product){
        const productInCart = this._products.includes(product);


        if (!productInCart) {
            this._products.push(product);
        }

        this._total += product.price;
        this._products.push(product);
    }
    get products(){
        return this._products
    }

    get total (){
        return this._total;
    }
}

