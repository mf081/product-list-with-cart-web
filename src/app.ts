// Importando os dados do arquivo JSON
import data from "../data.json"; // Não utilizamos chaves porque estamos importando um dado bruto, não uma exportação específica

// Importando as classes Product e Cart de suas respectivas entidades
import { Product } from "./entities/products"; // Classe Product para criar e manipular produtos
import { Cart } from "./entities/cart";       // Classe Cart para gerenciar o carrinho de compras

// Loop para criar e renderizar os objetos de produtos com base nos dados importados
for (let i = 0; i < data.length; i++) {
  // Extraindo os dados do JSON para cada produto
  const nome = data[i].name;
  const category = data[i].category;
  const price = data[i].price;
  const imageUrl = data[i].image.desktop;

  // Criando uma instância da classe Product com os dados extraídos
  const product = new Product(nome, category, price, imageUrl);

  // Chamando o método renderProducts para exibir os produtos na interface
  product.renderProducts();
}


