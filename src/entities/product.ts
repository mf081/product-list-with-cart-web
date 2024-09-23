import { v4 as uuidv4 } from "uuid";

export class Product {
    private _id: string = uuidv4();
    private _name: string;
    private _imageUrl: string;
    private _price: number;
    private _category: string;

    constructor (
        name: string, 
        category: string, 
        price: number,
        imageUrl: string
    ) {
        this._name = name,
        this._category = category,
        this._price = price,
        this._imageUrl = imageUrl
    }
    
    render() {
        const containerPrincipal = document.createElement("div")
        containerPrincipal.className = "container-principal"

        const productsImage = document.createElement("div");
        productsImage.className = "cards";    //deixar esse como uma div que recebe os outros

        const productCard = document.createElement("div");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <img class="product-image" src="${this._imageUrl}" alt="${this._name}">
            <div class="product-information"> 
                <p class="product-category">${this._category}</p>
                <p class="product-title">${this._name}</p>
                <p class="product-price">$${this._price.toFixed(2)}</p>
            </div>
        `;

        const addToCart = document.createElement("div");
        addToCart.className = "add-cart-btn";
        addToCart.innerHTML = `
            <div class="add-cart-icon">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
            </div>
            <span>Add to Cart</span>
        `;
        productCard.appendChild(addToCart); 
        productsImage.appendChild(productCard);
        containerPrincipal.appendChild(productsImage);

        const mainContainer = document.getElementById('main-id');
        if (mainContainer) {
            mainContainer.appendChild(containerPrincipal);
        }

        return containerPrincipal;
    }
    
    add() {
        return this._id;
    }
    
    remove() {
        console.log("olá")
    }
}