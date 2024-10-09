import { v4 as uuidv4 } from "uuid";
import { Cart } from "./cart";

export class Product {
  private _id: string = uuidv4();
  private _name: string;
  private _category: string;
  private _price: number;
  private _imageUrl: string;
  private _quantity: number = 0;
  private _total: number = 0;

  constructor(name: string, category: string, price: number, imageUrl: string) {
    this._name = name;
    this._category = category;
    this._price = price;
    this._imageUrl = imageUrl;
  }

  toHTML() {
    const productListHTML = document.getElementById("product-list");

    if (!productListHTML) return;

    const productHTML = document.createElement("li");
    productHTML.id = this._id;

    productHTML.innerHTML = `
        <div class="rounded-xl overflow-hidden flex flex-col border border-black h-[300px] w-[230px] ">
          <div class="mb-10 relative h-full bg-red-500">
            <img src="${this._imageUrl}" alt="${this._name}" class="object-cover h-full w-full" />
            <button id="button-add-to-cart" type="button" class="button rounded-lg text-xs">Add to Cart</button>
          </div>

          <div class="flex flex-col">
            <span class="product-category">${this._category}</span>
            <span class="product-name">${this._name}</span>
            <span class="product-price">R$${this._price.toFixed(2)}</span>
          </div>
        </div>
    `;

    const buttonAddToCartHTML = productHTML.querySelector("#button-add-to-cart");
    buttonAddToCartHTML?.addEventListener("click", () => this.incrementQuantity());

    productListHTML.appendChild(productHTML);
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get quantity() {
    return this._quantity;
  }

  get total() {
    return this._total;
  }

  calculateTotal() {
    this._total = this._quantity * this._price;
  }

  incrementQuantity() {
    this._quantity++;
    this.calculateTotal();
    Cart.addToCart(this);
  }

  decrementQuantity() {
    this._quantity--;
    this.calculateTotal();
    // TODO: remover o produto do carrinho se a quantidade for 0
  }

  get price() {
    return this._price;
  }
}
