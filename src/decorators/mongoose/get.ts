import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoGet(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const documents = await model.findById(req.params.id);
        req.mongoGet = documents;

        if (documents) {
          req.mongoGet = documents;
        } else {
          return res.status(404).json({ error_code: 'MEASURES_NOT_FOUND', error_description: 'Nenhuma leitura encontrada' });
        }
      } catch (error) {
        console.error('Error getting data: ', error);
        return res.status(400).json({ error_code: 'INVALID_TYPE', error_description: 'Tipo de medição não permitida' });
      }
      return originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
