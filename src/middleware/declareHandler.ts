import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      mongoGet: Document | undefined;
      mongoPost: Document | undefined;
      mongoPatch: Document | undefined;
    }
  }
}

export function declareHandler(req: Request, res: Response, next: NextFunction) {
  req.mongoGet = undefined;
  req.mongoPost = undefined;
  req.mongoPatch = undefined;

  next();
}
