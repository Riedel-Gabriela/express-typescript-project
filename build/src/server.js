"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shutdown = exports.Main = exports.httpServer = exports.app = void 0;
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
require("./config/config");
require("reflect-metadata");
const loggingHandler_1 = require("./middleware/loggingHandler");
const corsHandler_1 = require("./middleware/corsHandler");
const routeNotFound_1 = require("./middleware/routeNotFound");
const routes_1 = require("./modules/routes");
const main_1 = __importDefault(require("./controllers/main"));
exports.app = (0, express_1.default)();
const Main = () => {
    console.log('Initializing API...');
    exports.app.use(express_1.default.urlencoded({ extended: true }));
    exports.app.use(express_1.default.json());
    exports.app.use(loggingHandler_1.loggingHandler);
    exports.app.use(corsHandler_1.corsHandler);
    (0, routes_1.defineRoutes)([main_1.default], exports.app);
    exports.app.use(routeNotFound_1.routeNotFound);
    exports.httpServer = http_1.default.createServer(exports.app);
    exports.httpServer.listen(process.env.SERVER_PORT, () => {
        console.log(`Server is running on http://${process.env.SERVER_HOSTNAME}:${process.env.SERVER_PORT}`);
    });
};
exports.Main = Main;
const Shutdown = (callback) => exports.httpServer && exports.httpServer.close(callback);
exports.Shutdown = Shutdown;
(0, exports.Main)();
