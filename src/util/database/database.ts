import { connect } from 'mongoose';

export const dbConnect = async (callback: (success: boolean) => void) => {
  try {
    await connect(process.env.MONGO_CONN_STRING as string);

    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};
