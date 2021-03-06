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
exports.requesteHasFilename = exports.requesteHasValidFilename = exports.resize = exports.readDirectory = void 0;
var promises_1 = require("fs/promises");
var sharp_1 = __importDefault(require("sharp"));
var enum_1 = __importDefault(require("./enum"));
var var_1 = require("./var");
// list the files of a directory and compare it to filename
var readDirectory = function (dir, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var name, fileExtensions, files, _i, files_1, file, _a, fileExtensions_1, extension, err_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = '';
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                fileExtensions = Object.values(enum_1.default);
                return [4 /*yield*/, (0, promises_1.readdir)(dir)];
            case 2:
                files = _b.sent();
                for (_i = 0, files_1 = files; _i < files_1.length; _i++) {
                    file = files_1[_i];
                    for (_a = 0, fileExtensions_1 = fileExtensions; _a < fileExtensions_1.length; _a++) {
                        extension = fileExtensions_1[_a];
                        if (file === filename + extension) {
                            name = file;
                        }
                    }
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.error(err_1);
                return [3 /*break*/, 4];
            case 4: 
            // return the file if exists or ''
            return [2 /*return*/, name];
        }
    });
}); };
exports.readDirectory = readDirectory;
// resize a given image
var resize = function (reqParams) { return __awaiter(void 0, void 0, void 0, function () {
    var outputPath, imagePath, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                outputPath = '';
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                imagePath = "".concat(var_1.inputImageDirectory).concat(reqParams.filename, ".jpg");
                outputPath = "".concat(var_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg");
                return [4 /*yield*/, (0, sharp_1.default)(imagePath)
                        .resize(reqParams.width, reqParams.height, { fit: 'cover' })
                        .toFile(outputPath)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Error in the resize function : ".concat(error_1));
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/, outputPath];
        }
    });
}); };
exports.resize = resize;
// eslint-disable-next-line consistent-return
var requesteHasValidFilename = function (res) { return __awaiter(void 0, void 0, void 0, function () {
    var dirFile, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, (0, exports.readDirectory)("".concat(var_1.inputImageDirectory), "".concat(res.locals.reqParams.filename))];
            case 1:
                dirFile = _a.sent();
                if (dirFile) {
                    return [2 /*return*/, dirFile];
                }
                // no valid filename in the query throw an error
                throw new Error('Filename does not exist');
            case 2:
                error_2 = _a.sent();
                res.status(500).send("".concat(error_2));
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.requesteHasValidFilename = requesteHasValidFilename;
var requesteHasFilename = function (req, res) {
    // if the query contains a filename, instancies queryParams
    if (req.query.filename) {
        var reqParams = {
            filename: req.query.filename,
            width: parseInt(req.query.width, 10) || 200,
            height: parseInt(req.query.height, 10) || 200,
        };
        res.locals.reqParams = reqParams;
        return true;
    }
    return false;
};
exports.requesteHasFilename = requesteHasFilename;
