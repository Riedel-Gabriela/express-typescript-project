import { Request, Response, NextFunction } from 'express';
import mongoose, { Model } from 'mongoose';
import { run } from '../../gemini/connection';

export function MongoPost(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      const body = await run(req.body.image);
      const bodyJson = JSON.parse(body);
      try {
        const document = new model({
          _id: new mongoose.Types.ObjectId(),
          ...bodyJson
        });
        await document.save();
        req.mongoPost = document;
      } catch (error: any) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
      }
      return originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
