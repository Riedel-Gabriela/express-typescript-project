import mongoose from 'mongoose';
import { mongo } from '../config/config';

export const connectToMongoDB = async () => {
  await mongoose.connect(mongo.MONGO_URL!, mongo.MONGO_OPTIONS);
};
