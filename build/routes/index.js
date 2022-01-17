"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middlewares_1 = require("../utilities/middlewares");
var routes = express_1.default.Router();
routes.use('/image', middlewares_1.requesteHasValidInput, middlewares_1.verifyCache, middlewares_1.resizer, middlewares_1.errorHandler, function (req, res) {
    res.sendFile(res.locals.thumbPath, {
        root: '.',
    });
});
exports.default = routes;
