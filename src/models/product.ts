import db from '../util/database';
import { getObjectsFromFile, writeObjectsToFile } from '../util/file';
import Cart from './cart';

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
    this.id = this.id || new Date().getTime();

    return db.execute('INSERT INTO products (id, title, price, imageUrl, description) VALUES (?, ?, ?, ?, ?)', [
      this.id,
      this.title,
      this.price,
      this.imageUrl,
      this.description,
    ]);
  }

  static getAll() {
    return db.execute('SELECT * FROM products');
  }

  static async getAllByIds(ids: number[]) {
    const productList: IProduct[] = await getObjectsFromFile('products');
    return productList.filter((product) => ids.includes(product.id || 0));
  }

  static async getById(id: number) {
    return db.execute('SELECT * FROM products WHERE id = ?', [id]);
  }

  static async deleteById(id: number) {
    const productList: IProduct[] = await getObjectsFromFile('products');
    const product = productList.find((product) => product.id === id);

    Cart.deleteProduct(id, product?.price || 0);

    const filteredList = productList.filter((product) => product.id !== id);
    writeObjectsToFile('products', filteredList);
  }
}

export default Product;
