import { getProductsFromFile, writeProductsToFile } from '../util/file';

class Product implements IProduct {
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
    const existingProducts = await getProductsFromFile();
    existingProducts.push(this);
    writeProductsToFile(existingProducts);
  }

  static getAll() {
    return getProductsFromFile();
  }
}

export default Product;
