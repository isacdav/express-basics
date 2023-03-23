import { connect } from 'mongoose';
import { MONGO_CONNECTION_STRING } from '../constants/constants';

export const dbConnect = async (callback: (success: boolean) => void) => {
  try {
    await connect(MONGO_CONNECTION_STRING);

    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};
