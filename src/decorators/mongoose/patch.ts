import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';

export function MongoPatch(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const document = new model({
          _id: new mongoose.Types.ObjectId(),
          ...req.body
        });

        await document.save();
        req.mongoPost = document;
      } catch (error) {
        console.error('Error getting data: ', error);
        return res.status(500).json({ message: 'Error creating data' });
      }
      return originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
