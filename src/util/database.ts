import { MongoClient, Db } from 'mongodb';

let _db: Db | undefined;

const connect = async (callback: (success: boolean) => void) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost:27017');
    _db = client.db('shop');
    callback(true);
  } catch (error) {
    console.log(error);
    callback(false);
  }
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw 'No database found!';
};

export default connect;
export { getDb };
