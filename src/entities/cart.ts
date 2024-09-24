// Importando a classe Product para que a classe Cart possa trabalhar com produtos
import { Product } from "./products";

// Definindo a classe Cart para representar um carrinho de compras
export class Cart {
    // Array privado para armazenar os produtos no carrinho
    private _products: Product[] = [];
    // Variável privada para armazenar o total do carrinho
    private _total: number = 0;
    
    // Getter para acessar a lista de produtos no carrinho
    get products() {
        return this._products; // Retorna a lista de produtos
    }

    // Getter para acessar o total do carrinho
    get total() {
        return this._total; // Retorna o total acumulado
    }

    // Método para adicionar um produto ao carrinho
    addToCart(product: Product) {
        this._total += product.price; // Adiciona o preço do produto ao total
        this._products.push(product);  // Adiciona o produto ao array de produtos
    }
}
