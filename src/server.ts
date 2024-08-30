import http from 'http';
import express from 'express';
import mongoose from 'mongoose';

import 'reflect-metadata';

import { corsHandler } from './middleware/corsHandler';
import { declareHandler } from './middleware/declareHandler';
import { loggingHandler } from './middleware/loggingHandler';
import { routeNotFound } from './middleware/routeNotFound';
import { server, mongo } from './config/config';
import { defineRoutes } from './modules/routes';
import MainController from './controllers/main';

export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

export const Main = async () => {
  console.log('Initializing API');

  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  console.log('Connecting to Database');

  try {
    const connection = await mongoose.connect(mongo.MONGO_CONNECTION, mongo.MONGO_OPTIONS);
    console.log('Connected to Database: ', connection.version);
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }

  console.log('Logging & Configuration');

  application.use(declareHandler);
  application.use(loggingHandler);
  application.use(corsHandler);

  console.log('Define Controller Routing');

  defineRoutes([MainController], application);

  console.log('Define Routing Error');
  application.use(routeNotFound);

  console.log('Starting Server');
  httpServer = http.createServer(application);
  httpServer.listen(server.SERVER_PORT, () => {
    console.log(`Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`);
  });
};

export const Shutdown = (callback: any) => httpServer && httpServer.close(callback);

Main();
