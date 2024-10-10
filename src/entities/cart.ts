import { Product } from "./product";

export class Cart {
  private static _products: Product[] = []; // Array para armazenar os produtos no carrinho
  private static _orderTotal: number = 0; // Total do pedido
  private static _totalQuantity: number = 0; // Quantidade total de produtos

  static calculateTotal() {
    this._orderTotal = 0;
    this._totalQuantity = 0;

    for (const product of this.products) {
      this._orderTotal += product.total;
      this._totalQuantity += product.quantity;
    }
  }

  static removeProduct(product: Product) {
    this._products = this._products.filter((item) => item.id !== product.id);
    this.calculateTotal(); // Atualiza o total após a remoção
  }

  static addToCart(product: Product) {
    const productInCart = this._products.includes(product);

    if (!productInCart) {
      this._products.push(product);
    }

    this.calculateTotal(); // Calcula o total após a adição

    // Atualiza o carrinho de compras no HTML
    this.toHTML();
  }

  static toHTML() {
    const cartContainerHTML = document.getElementById("cart-container");

    if (!cartContainerHTML) return; // Verifica se o contêiner do carrinho existe

    const totalQuantityHTML = cartContainerHTML.querySelector(
      "#total-quantity-text"
    );

    if (!totalQuantityHTML) return; // Verifica se o elemento de quantidade total existe
    totalQuantityHTML.textContent = this._totalQuantity.toString(); // Atualiza a quantidade total

    // Atualiza o preço total
    const totalPriceHTML = cartContainerHTML.querySelector(
      "#total-price-text"
    );

    if (totalPriceHTML) {
      totalPriceHTML.textContent = `R$${this._orderTotal.toFixed(2)}`; // Atualiza o preço total
    }

    let ulProductsHTML = cartContainerHTML.querySelector("ul");

    if (ulProductsHTML) {
      ulProductsHTML.innerHTML = ""; // Limpa a lista existente
    } else {
      ulProductsHTML = document.createElement("ul"); // Cria uma nova lista se não existir
    }

    for (const product of this._products) {
      const liProductHTML = document.createElement("li");

      const productHTML = `
        <span>${product.name}</span>
        <div>
          <span>${product.quantity}x</span>
          <span>@R$${product.price.toFixed(2)}</span>
          <span>R$${product.total.toFixed(2)}</span>
        </div>
      `;

      liProductHTML.innerHTML = productHTML; // Define o HTML do produto
      ulProductsHTML.appendChild(liProductHTML); // Adiciona o produto à lista
    }

    cartContainerHTML.appendChild(ulProductsHTML); // Adiciona a lista ao contêiner do carrinho
  }

  static get products() {
    return this._products;
  }

  static get total() {
    return this._orderTotal;
  }
}
