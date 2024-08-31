import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';

export function MongoPatch(model: Model<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (req: Request, res: Response, next: NextFunction) {
      try {
        const document = await model.findById(req.params.measure_uuid);

        if (!document) {
          return res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura do mês já realizada' });
        }

        document.set({ ...req.body });

        await document.save();

        req.mongoPatch = document;
      } catch (error: any) {
        return res.status(400).json({ error_code: 'INVALID_DATA', error_description: error.message });
      }

      return originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
