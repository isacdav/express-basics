import { getObjectsFromFile, writeObjectsToFile } from '../util/file';
import { isEmptyObject } from '../util/helpers';

class Cart implements ICart {
  products: ICartProduct[];
  totalPrice: number;

  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }

  static async addProduct(id: number, productPrice: number) {
    const cartReq = (await getObjectsFromFile('cart', true)) as ICart;
    const cart = isEmptyObject(cartReq) ? new Cart() : cartReq;

    const existingProductIndex = cart.products?.findIndex((product) => product.id === id);

    const existingProduct = cart.products[existingProductIndex] 

    let updatedProduct: ICartProduct;
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.qty = updatedProduct.qty + 1;
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      updatedProduct = { id, qty: 1 };
    }

    cart.totalPrice = cart.totalPrice + +productPrice;
    cart.products = [...cart.products, updatedProduct];

    writeObjectsToFile('cart', cart);
  }
}

export default Cart;
