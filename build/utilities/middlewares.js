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
var functions_1 = require("./functions");
var variables_1 = require("./variables");
// Middleware resizer
var resizer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, reqParams, shouldResize, outputPath, outputPath, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = res.locals, reqParams = _a.reqParams, shouldResize = _a.shouldResize;
                if (!!shouldResize) return [3 /*break*/, 1];
                console.log('Skip resizer');
                outputPath = "".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg");
                res.locals.thumbPath = outputPath;
                next();
                return [3 /*break*/, 3];
            case 1:
                // test if the file exists
                (0, functions_1.requesteHasValidFilename)(res);
                return [4 /*yield*/, (0, functions_1.resize)(reqParams)];
            case 2:
                outputPath = _b.sent();
                res.locals.thumbPath = outputPath;
                next();
                _b.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _b.sent();
                res.status(500).send("".concat(error_1));
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
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
            // test if the query contains a filename
            if ((0, functions_1.requesteHasFilename)(req, res)) {
                reqParams = res.locals.reqParams;
                // test if the processed image is already cached
                if (cache.has("".concat(JSON.stringify(reqParams.reqParams)))) {
                    console.log('Retrieved value from cache !!');
                    // if the image has already been processed, the resizer middleware is skipped
                    res.locals.shouldResize = false;
                    next();
                    // if not cached, the cache key is set to the query parameters and the programme advance to the resizer
                }
                else {
                    res.locals.shouldResize = true;
                    console.log('No cache for that !!');
                    // set a key using the query parameters and a ttl of 2hr and 47 mn
                    cache.set("".concat(JSON.stringify(reqParams)), JSON.stringify(reqParams), 10000);
                    next();
                }
            }
            else {
                // no filename in the query throw an error
                throw new Error('Filename missing');
            }
            // send back to the client a 500 and "Filename Missing"
        }
        catch (error) {
            res.status(500).send("".concat(error));
        }
        return [2 /*return*/];
    });
}); };
exports.verifyCache = verifyCache;
