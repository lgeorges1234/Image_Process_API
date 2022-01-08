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
var sharp_1 = __importDefault(require("sharp"));
var path_1 = __importDefault(require("path"));
var function_1 = __importDefault(require("./function"));
// resize a given image
var resize = function (reqParams) { return __awaiter(void 0, void 0, void 0, function () {
    var imagePath, outputPath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                imagePath = path_1.default.normalize("public/img/full/".concat(reqParams.filename, ".jpg"));
                outputPath = path_1.default.normalize("public/img/thumb/".concat(reqParams.filename, "_thumb.jpg"));
                return [4 /*yield*/, (0, sharp_1.default)(imagePath)
                        .resize(reqParams.width, reqParams.height, { fit: 'cover' })
                        .toFile(outputPath)];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.log("Error in the resize function : ".concat(error_1));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Middleware resizer
var resizer = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reqParams, dirFile, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 7, , 8]);
                if (!req.query.filename) return [3 /*break*/, 5];
                reqParams = {
                    filename: req.query.filename,
                    width: parseInt(req.query.width, 10) || 200,
                    height: parseInt(req.query.height, 10) || 200,
                };
                return [4 /*yield*/, (0, function_1.default)("public/img/full/", "".concat(reqParams.filename))];
            case 1:
                dirFile = _a.sent();
                if (!dirFile) return [3 /*break*/, 3];
                return [4 /*yield*/, resize(reqParams)];
            case 2:
                _a.sent();
                next();
                return [3 /*break*/, 4];
            case 3: throw new Error('No valid input file');
            case 4: return [3 /*break*/, 6];
            case 5: throw new Error('No input file');
            case 6: return [3 /*break*/, 8];
            case 7:
                error_2 = _a.sent();
                res.status(500).send("".concat(error_2));
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.default = resizer;
// if (req.query.filename) {
//   const reqParams: queryParams = {
//     filename: req.query.filename as unknown as string,
//     width: parseInt(req.query.width as unknown as string, 10) || 200,
//     height: parseInt(req.query.height as unknown as string, 10) || 200,
//   };
//   resize(reqParams);
//   next();
// } else {
//   res.send('No filename');
//   next(500);
// }