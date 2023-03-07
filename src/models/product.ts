import { getProductsFromFile, writeProductsToFile } from '../util/file';

class Product implements IProduct {
  title: string;

  constructor(title: string) {
    this.title = title;
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
