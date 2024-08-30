"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggingHandler = loggingHandler;
function loggingHandler(req, res, next) {
    var _a;
    console.log(`METHOD: ${req.method} - URL: ${req.url} - IP: ${(_a = res.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress}`);
    res.on('finish', () => {
        var _a;
        console.log(`METHOD: ${req.method} - URL: ${req.url} - IP: ${(_a = res.socket) === null || _a === void 0 ? void 0 : _a.remoteAddress} - STATUS: ${res.statusCode}`);
    });
    next();
}
