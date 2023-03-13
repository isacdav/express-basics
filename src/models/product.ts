import { getObjectsFromFile, writeObjectsToFile } from '../util/file';

class Product implements IProduct {
  id?: number;
  title: string;
  imageUrl: string;
  description: string;
  price: number;

  constructor(id: number | undefined, title: string, imageUrl: string, description: string, price: number) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  async save() {
    const existingProducts: IProduct[] = await getObjectsFromFile('products');

    let prodsToSave: IProduct[] = [];
    if (this.id) {
      const existingProductIndex = existingProducts.findIndex((product) => product.id === this.id);
      const updatedProducts = [...existingProducts];
      updatedProducts[existingProductIndex] = this;
      prodsToSave = updatedProducts;
    } else {
      this.id = new Date().getTime();
      prodsToSave = [...existingProducts, this];
    }

    writeObjectsToFile('products', prodsToSave);
  }

  static getAll() {
    return getObjectsFromFile('products');
  }

  static async getById(id: number) {
    const productList: IProduct[] = await getObjectsFromFile('products');
    return productList.find((product) => product.id === id);
  }
}

export default Product;
