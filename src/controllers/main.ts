import { Request, Response, NextFunction } from 'express';
import { Controller } from '../decorators/controller';
import { Route } from '../decorators/route';
import { Validate } from '../decorators/validate';
import Document from '../types/document';
import Confirmation from '../types/confirmation';

import Joi from 'joi';
import { MongoGet } from '../decorators/mongoose/get';
import { DocumentModel } from '../models/document';
import { MongoPost } from '../decorators/mongoose/post';

const postDocument = Joi.object<Document>({
  image: Joi.string().base64({ paddingRequired: false }).required(),
  measure_datetime: Joi.date().required(),
  measure_type: Joi.string().valid('WATER', 'GAS').required()
});

const confirmDocument = Joi.object<Confirmation>({
  measure_uuid: Joi.string().required(),
  confirmed_value: Joi.number().required()
});

@Controller()
class MainController {
  @Route('get', '/healthcheck')
  getHealthCheck(req: Request, res: Response, next: NextFunction) {
    console.log('Healthcheck called successfully!');
    return res.status(200).json({ hello: 'world!' });
  }

  @Route('get', '/:id/list')
  @MongoGet(DocumentModel)
  getCustomerList(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoGet);
  }

  @Route('post', '/upload')
  @MongoPost(DocumentModel)
  @Validate(postDocument)
  postDocument(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoPost);
  }

  @Route('patch', '/confirm')
  @Validate(confirmDocument)
  confirmDocument(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json(req.mongoPatch);
  }
}

export default MainController;
