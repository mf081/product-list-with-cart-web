// Importando a função 'v4' do pacote 'uuid' para gerar identificadores únicos
import { v4 as uuid4 } from "uuid";

// Definindo a classe Product para representar um produto
export class Product {
  // Atributos privados para o produto
  private _id: string = uuid4(); // Cada produto terá um ID único gerado pelo 'uuid'
  private _name: string = "";    // Nome do produto
  private _category: string = ""; // Categoria do produto
  private _price: number = 0;    // Preço do produto
  private _imageUrl: string = ""; // URL da imagem do produto

  // O construtor recebe os valores e os atribui aos atributos do produto
  constructor(name: string, category: string, price: number, imageUrl: string) {
    (this._category = category), // Atribui a categoria
      (this._price = price),     // Atribui o preço
      (this._name = name),       // Atribui o nome
      (this._imageUrl = imageUrl); // Atribui a URL da imagem
  }

  // Getter para o preço do produto
  get price() {
    return this._price;
  }

  // Método para renderizar os produtos na interface como cards
  renderProducts() {
    // Cria o container principal do card do produto
    const productCard = document.createElement("div");
    productCard.className = "product-card"; // Adiciona a classe CSS

    // Cria a seção de imagem do produto
    const productImage = document.createElement("div");
    productImage.className = "product-image"; // Classe CSS
    productImage.innerHTML = `<img
                src="${this._imageUrl}"
                alt="${this._name}"
              />`; // Adiciona a imagem do produto

    // Cria o botão de "Adicionar ao Carrinho"
    const addCartBtn = document.createElement("div");
    addCartBtn.className = "add-cart-btn"; // Classe CSS
    addCartBtn.innerHTML = `<div id="addCart-${this._id}" class="add-cart-icon">
                <i class="fa fa-cart-plus" aria-hidden="true"></i>
              </div>
              <span>Add to Cart</span>`; // Ícone e texto do botão

    // Cria a div para as informações do produto
    const productInfo = document.createElement("div");
    productInfo.className = "product-information"; // Classe CSS

    // Cria o elemento para a categoria do produto
    const productCat = document.createElement("div");
    productCat.className = "product-category"; // Classe CSS
    productCat.innerHTML = `<span>${this._category}</span>`; // Exibe a categoria

    // Cria o elemento para o nome do produto
    const productName = document.createElement("div");
    productName.className = "product-name"; // Classe CSS
    productName.innerHTML = `<span>${this._name}</span>`; // Exibe o nome do produto

    // Cria o elemento para o preço do produto
    const productPrice = document.createElement("div");
    productPrice.className = "product-price"; // Classe CSS
    productPrice.innerHTML = `<span>$ ${this._price}</span>`; // Exibe o preço do produto

    // Adiciona a categoria, nome e preço à div de informações do produto
    if (productInfo) {
      productInfo.appendChild(productCat);
      productInfo.appendChild(productName);
      productInfo.appendChild(productPrice);
    }

    // Adiciona o card de produto ao container 'cards' na página HTML
    const cards = document.getElementById("cards");
    if (cards) {
      cards.appendChild(productCard);
    }

    // Adiciona a imagem, botão e informações ao card principal do produto
    productCard.append(productImage, addCartBtn, productInfo);
  }
}


