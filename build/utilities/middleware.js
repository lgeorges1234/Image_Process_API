"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCache = exports.resizer = void 0;
var node_cache_1 = __importDefault(require("node-cache"));
var function_1 = require("./function");
// Middleware resizer
var resizer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqParams, outputPath, dirFile, outputPath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                reqParams = res.locals.reqParams;
                if (!!res.locals.shouldResize) return [3 /*break*/, 1];
                console.log('Skip resizer');
                outputPath = "public/img/thumb/".concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg");
                res.locals.thumbPath = outputPath;
                next();
                return [3 /*break*/, 5];
            case 1: return [4 /*yield*/, (0, function_1.readDirectory)("public/img/full/", "".concat(reqParams.filename))];
            case 2:
                dirFile = _a.sent();
                if (!dirFile) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, function_1.resize)(reqParams)];
            case 3:
                outputPath = _a.sent();
                res.locals.thumbPath = outputPath;
                next();
                return [3 /*break*/, 5];
            case 4: throw new Error('No valid input file');
            case 5: return [3 /*break*/, 7];
            case 6:
                error_1 = _a.sent();
                res.status(500).send("".concat(error_1));
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.resizer = resizer;
// Middleware verifyCache
var cache = new node_cache_1.default();
var verifyCache = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqParams;
    return __generator(this, function (_a) {
        try {
            // if the query contain a filename, it create an instance of the interface queryParams
            if (req.query.filename) {
                reqParams = {
                    filename: req.query.filename,
                    width: parseInt(req.query.width, 10) || 200,
                    height: parseInt(req.query.height, 10) || 200,
                };
                res.locals.reqParams = reqParams;
                // test if the processed image is already cached
                if (cache.has("".concat(JSON.stringify(res.locals.reqParams)))) {
                    console.log('Retrieved value from cache !!');
                    // if the image has already been processed, the resizer middleware is skipped
                    res.locals.shouldResize = false;
                    next();
                    // if the file is not in the cache, the cache key is set and the programme advance to the next middleware
                }
                else {
                    res.locals.shouldResize = true;
                    console.log('No cache for that !!');
                    // set a key using the query parameters and a ttl of 2hr and 47 mn
                    cache.set("".concat(JSON.stringify(res.locals.reqParams)), JSON.stringify(res.locals.reqParams), 10000);
                    next();
                }
                // if the querry has no filename, an error is throwed
            }
            else {
                throw new Error('No input file');
            }
            // send back to the client the : "No input file error"
        }
        catch (error) {
            res.status(500).send("".concat(error));
        }
        return [2 /*return*/];
    });
}); };
exports.verifyCache = verifyCache;
