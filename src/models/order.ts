import { model, Schema } from 'mongoose';
import { ORDER_SCHEMA_NAME, USER_SCHEMA_NAME } from '../util/constants';

const orderSchema = new Schema({
  products: [
    {
      product: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    userId: { type: Schema.Types.ObjectId, required: true, ref: USER_SCHEMA_NAME },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
});

const Order = model(ORDER_SCHEMA_NAME, orderSchema);
export default Order;
