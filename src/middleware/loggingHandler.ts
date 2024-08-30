import { Request, Response, NextFunction } from 'express';

export function loggingHandler(req: Request, res: Response, next: NextFunction) {
  console.log(`METHOD: ${req.method} - URL: ${req.url} - IP: ${res.socket?.remoteAddress}`);
  res.on('finish', () => {
    console.log(`METHOD: ${req.method} - URL: ${req.url} - IP: ${res.socket?.remoteAddress} - STATUS: ${res.statusCode}`);
  });
  next();
}
