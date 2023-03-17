import mongoose from 'mongoose';
import User from '../models/user';

const connect = async (callback: (success: boolean) => void) => {
  try {
    await mongoose.connect('mongodb://localhost:27017/shop');

    const existingUser = await User.findOne();
    if (!existingUser) {
      const user = new User({ name: 'Isaac', email: 'isaac@mail.com', cart: { items: [] } });
      await user.save();
    }

    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};

export default connect;
