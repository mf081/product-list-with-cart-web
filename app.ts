import { v4 as randomUUID } from "uuid";

class Produto {
  private _id: string = randomUUID();
  private _name: string;
  private _category: string;
  private _price: number;
  private _imageUrl: string;

  constructor(name: string, category: string, price: number, imageUrl: string) {
    this._name = name;
    this._category = category;
    this._price = price;
    this._imageUrl = imageUrl;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  get id() {
    return this._id;
  }

  toHTML() {
    const productContainer = document.createElement("li");
    productContainer.className = "product-item";
    productContainer.id = this._id;

    const productHTML = `
      <div class="product-type"><p>${this._category}</p></div>
      <h2 class="product-title">${this._name}</h2>
      <p class="product-price">$${this._price.toFixed(2)}</p>
      <button class="btn-add-to-cart">Add to Cart</button>
    `;

    productContainer.innerHTML = productHTML;
    return productContainer;
  }
}

class Carrinho {
  private _itens: { produto: Produto; quantidade: number }[] = [];

  adicionarProduto(produto: Produto) {
    const produtoExistente = this._itens.find(item => item.produto.id === produto.id);
    if (produtoExistente) {
      produtoExistente.quantidade += 1;
    } else {
      this._itens.push({ produto, quantidade: 1 });
    }
    this.atualizarCarrinho();
  }

  atualizarCarrinho() {
    const carrinhoContainer = document.querySelector(".cart") as HTMLElement;
    const totalElement = carrinhoContainer.querySelector("p strong") as HTMLElement;
    const itensContainer = carrinhoContainer.querySelectorAll(".cart-item");

    itensContainer.forEach(item => item.remove());

    let total = 0;

    this._itens.forEach(({ produto, quantidade }) => {
      const itemContainer = document.createElement("div");
      itemContainer.className = "cart-item";
      itemContainer.innerHTML = `
        <p class="cart-item-title"><strong>${produto.name}</strong></p>
        <p class="cart-item-price"><strong>${quantidade}x</strong> @ $${produto.price.toFixed(2)} $${(quantidade * produto.price).toFixed(2)}</p>
      `;
      total += quantidade * produto.price;
      carrinhoContainer.insertBefore(itemContainer, totalElement);
    });

    totalElement.textContent = `$${total.toFixed(2)}`;
    const totalItemsElement = carrinhoContainer.querySelector("h2") as HTMLElement;
    totalItemsElement.textContent = `Your Cart (${this._itens.reduce((acc, item) => acc + item.quantidade, 0)})`;
  }
}

// Inicializando produtos
const produtos = [
  new Produto("Waffle with Berries", "Waffle", 6.50, "./assets/images/waffle.jpg"),
  new Produto("Vanilla Bean Crème Brûlée", "Crème Brûlée", 7.00, "./assets/images/creme-brulee.jpg"),
  new Produto("Macaron Mix of Five", "Macaron", 8.00, "./assets/images/macaron.jpg"),
  new Produto("Classic Tiramisu", "Tiramisu", 5.50, "./assets/images/tiramisu.jpg"),
  new Produto("Pistachio Baklava", "Baklava", 4.00, "./assets/images/baklava.jpg"),
  new Produto("Lemon Meringue Pie", "Pie", 5.00, "./assets/images/lemon-pie.jpg"),
  new Produto("Red Velvet Cake", "Cake", 4.50, "./assets/images/red-velvet.jpg"),
  new Produto("Salted Caramel Brownie", "Brownie", 4.50, "./assets/images/brownie.jpg"),
  new Produto("Vanilla Panna Cotta", "Panna Cotta", 6.50, "./assets/images/panna-cotta.jpg"),
];

document.addEventListener("DOMContentLoaded", () => {
  // Renderizando os produtos
  const productList = document.querySelector(".product-list") as HTMLElement;
  produtos.forEach(produto => {
    const productHTML = produto.toHTML();
    productList.appendChild(productHTML);
  });

  // Inicializando carrinho
  const carrinho = new Carrinho();

  document.body.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains("btn-add-to-cart")) {
      const productId = target.closest(".product-item")?.id;
      const produto = produtos.find(p => p.id === productId);
      if (produto) {
        carrinho.adicionarProduto(produto);
      }
    }
  });
});
