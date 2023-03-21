import mongoose from 'mongoose';
import { User } from '../../models';
import { MONGO_CONNECTION_STRING } from '../constants/constants';

export const dbConnect = async (callback: (success: boolean) => void) => {
  try {
    await mongoose.connect(MONGO_CONNECTION_STRING);

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
