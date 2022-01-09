"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var middleware_1 = __importDefault(require("../utilities/middleware"));
var routes = express_1.default.Router();
routes.use('/image', middleware_1.default, function (req, res) {
    res.sendFile(res.locals.thumbPath, {
        root: '.',
    });
});
exports.default = routes;
