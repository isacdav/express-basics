import { model, Schema } from 'mongoose';
import { ICartItem, IProduct, IUser, IUserMethods, UserModel } from '../../interfaces';
import { PRODUCT_SCHEMA_NAME, USER_SCHEMA_NAME } from '../../util';

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: PRODUCT_SCHEMA_NAME, required: true },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

userSchema.methods.addToCart = function (product: IProduct) {
  const cartProductIndex = this.cart.items.findIndex(
    (cp: ICartItem) => cp.productId.toString() === product._id.toString(),
  );
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({ productId: product._id, quantity: newQuantity });
  }
  const updatedCart = { items: updatedCartItems };
  this.cart = updatedCart;

  return this.save();
};

userSchema.methods.deleteFromCart = function (productId: string) {
  const updatedCartItems = this.cart.items.filter((item: ICartItem) => item.productId.toString() !== productId);
  this.cart.items = updatedCartItems;

  return this.save();
};

userSchema.methods.clearCart = function () {
  this.cart = { items: [] };

  return this.save();
};

export const User = model<IUser, UserModel>(USER_SCHEMA_NAME, userSchema);
