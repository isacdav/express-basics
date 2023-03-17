import { model, Schema } from 'mongoose';
import { IProduct } from '../interfaces';
import { PRODUCT_SCHEMA_NAME, USER_SCHEMA_NAME } from '../util/constants';

const productSchema = new Schema<IProduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: USER_SCHEMA_NAME,
    required: true,
  },
});

const Product = model<IProduct>(PRODUCT_SCHEMA_NAME, productSchema);
export default Product;
