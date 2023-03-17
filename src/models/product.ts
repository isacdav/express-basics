import { ObjectId } from 'mongodb';
import { ProductAttributes } from '../interfaces/interfaces';
import { getDb } from '../util/database';

class Product implements ProductAttributes {
  _id?: ObjectId;
  title: string;
  imageUrl: string;
  description: string;
  price: number;
  userId: ObjectId;

  constructor(
    title: string,
    imageUrl: string,
    description: string,
    price: number,
    userId: ObjectId | undefined,
    _id?: ObjectId | string | undefined,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.userId = new ObjectId(userId);
    if (_id) this._id = new ObjectId(_id);
  }

  save() {
    const db = getDb();
    if (this._id) {
      return db.collection('products').updateOne({ _id: this._id }, { $set: this });
    }
    return db.collection('products').insertOne(this);
  }

  static getById(id: string) {
    const db = getDb();
    return db.collection('products').findOne({ _id: new ObjectId(id) });
  }

  static getAll() {
    const db = getDb();
    return db.collection('products').find().toArray();
  }

  static deleteById(id: string) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: new ObjectId(id) });
  }
}

export default Product;
