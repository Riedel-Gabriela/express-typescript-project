"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../decorators/controller");
const route_1 = require("../decorators/route");
let MainController = class MainController {
    getHealthCheck(req, res, next) {
        console.log('Health check endpoint called');
        return res.status(200).json({ hello: 'world!' });
    }
};
__decorate([
    (0, route_1.Route)('get', '/healthcheck')
], MainController.prototype, "getHealthCheck", null);
MainController = __decorate([
    (0, controller_1.Controller)('/main')
], MainController);
exports.default = new MainController();
