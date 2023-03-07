const products: IProduct[] = [];

class Product implements IProduct {
  title: string;

  constructor(title: string) {
    this.title = title;
  }

  save() {
    products.push(this);
  }

  static getAll() {
    return products;
  }
}

export default Product;
