import { Product } from "./product";

export class Cart {
  private static _products: Product[] = [];
  private static _orderTotal: number = 0;
  private static _totalQuantity: number = 0;

  static calculateTotal() {
    this._orderTotal = 0;
    this._totalQuantity = 0;

    for (const product of this.products) {
      this._orderTotal += product.total;
      this._totalQuantity += product.quantity;
    }
  }

  static removeProduct(product: Product) {
    // Remove um produto do carrinho, filtrando pelo produto em questão
    this._products = this._products.filter((item) => item.id !== product.id);
    this.calculateTotal();
  }

  static addToCart(product: Product) {
    const productInCart = this._products.includes(product);

    if (!productInCart) {
      this._products.push(product);
    }

    this.calculateTotal();

    // Atualiza o carrinho de compras no HTML
    this.toHTML();
    // console.log(Cart._products);
  }

  static toHTML() {
    const cartContainerHTML = document.getElementById("cart-container");

    if (!cartContainerHTML) return;

    const totalQuantityHTML = cartContainerHTML.querySelector(
      "#total-quantity-text"
    );

    if (!totalQuantityHTML) return;
    totalQuantityHTML.textContent = this._totalQuantity.toString();

    let ulProductsHTML = cartContainerHTML.querySelector("ul");

    if (ulProductsHTML) {
      ulProductsHTML.innerHTML = "";
    } else {
      ulProductsHTML = document.createElement("ul");
    }

    for (const product of this._products) {
      const liProductHTML = document.createElement("li");

      const productHTML = `
        <span>${product.name}</span>
        <div>
          <span>${product.quantity}x</span>
          <span>@$${product.price}</span>
          <span>$${product.total}</span>
        </div>
      `;

      liProductHTML.innerHTML = productHTML;
      ulProductsHTML.appendChild(liProductHTML);
    }

    cartContainerHTML.appendChild(ulProductsHTML);
  }

  static get products() {
    return this._products;
  }

  static get total() {
    return this._orderTotal;
  }
}
