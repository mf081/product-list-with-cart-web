import { v4 as uuidv4 } from "uuid"; // Importa a função para gerar IDs únicos
import { Cart } from "./cart"; // Importa a classe Cart

export class Product {
  private _id: string = uuidv4(); // ID único para cada produto
  private _name: string; // Nome do produto
  private _category: string; // Categoria do produto
  private _price: number; // Preço do produto
  private _imageUrl: string; // URL da imagem do produto
  private _quantity: number = 0; // Quantidade do produto no carrinho
  private _total: number = 0; // Total acumulado do produto (quantidade * preço)

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
    <div class="product-card">
      <div class="product-image-container">
        <img src="${this._imageUrl}" alt="${this._name}" class="product-image" />
        <button id="button-add-to-cart" type="button" class="button-add-to-cart">Add to Cart</button>
      </div>
  
      <div class="product-info">
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
