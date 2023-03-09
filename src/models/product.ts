import { getProductsFromFile, writeProductsToFile } from '../util/file';

class Product implements IProduct {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(title: string, imageUrl: string, description: string, price: number) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    this.id = new Date().getTime();

    const existingProducts = await getProductsFromFile();
    existingProducts.push(this);

    writeProductsToFile(existingProducts);
  }

  static getAll() {
    return getProductsFromFile();
  }

  static async getById(id: number) {
    const productList = await getProductsFromFile();
    return productList.find((product) => product.id === id);
  }
}

export default Product;
