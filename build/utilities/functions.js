"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.isInCache = exports.makeOuputDir = exports.positiveInt = exports.requesteHasValidFilename = exports.resize = exports.readDirectory = void 0;
var promises_1 = require("fs/promises");
var sharp_1 = __importDefault(require("sharp"));
var fs_1 = __importStar(require("fs"));
var node_cache_1 = __importDefault(require("node-cache"));
var enum_1 = __importDefault(require("./enum"));
var cache = new node_cache_1.default();
// list the files of a directory and compare every file to the request filename
var readDirectory = function (dir, filename) { return __awaiter(void 0, void 0, void 0, function () {
    var name, fileExtensions, files, _i, files_1, file, _a, fileExtensions_1, extension;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                name = '';
                fileExtensions = Object.values(enum_1.default);
                return [4 /*yield*/, (0, promises_1.readdir)(dir)];
            case 1:
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
                // return the file if exists or ''
                return [2 /*return*/, name];
        }
    });
}); };
exports.readDirectory = readDirectory;
// resize a given image
var resize = function (reqParams, fullPath, thumbPath) { return __awaiter(void 0, void 0, void 0, function () {
    var outputPath, imagePath, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                outputPath = '';
                imagePath = "".concat(fullPath).concat(reqParams.filename, ".jpg");
                // set the ouput thumb path
                outputPath = "".concat(thumbPath).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg");
                // resize the original image and send the result to the ouput path
                return [4 /*yield*/, (0, sharp_1.default)(imagePath)
                        .resize(reqParams.width, reqParams.height, { fit: 'cover' })
                        .toFile(outputPath)];
            case 1:
                // resize the original image and send the result to the ouput path
                _b.sent();
                return [2 /*return*/, outputPath];
            case 2:
                _a = _b.sent();
                throw new Error('Wrong parameters fot the resize function');
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.resize = resize;
// check if the filename belongs to the input folder
var requesteHasValidFilename = function (filename, fullPath) { return __awaiter(void 0, void 0, void 0, function () {
    var dirFile;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.readDirectory)("".concat(fullPath), "".concat(filename))];
            case 1:
                dirFile = _a.sent();
                // return true if the file existe or false
                if (dirFile !== '') {
                    return [2 /*return*/, true];
                }
                return [2 /*return*/, false];
        }
    });
}); };
exports.requesteHasValidFilename = requesteHasValidFilename;
// test if the value is a positive integer
function positiveInt(value, defaultResizedValue) {
    var number = parseInt(value, 10);
    // return the int value or the default value
    if (Number.isInteger(number) && number > 0) {
        return number;
    }
    return defaultResizedValue;
}
exports.positiveInt = positiveInt;
// create a thumb directory if it does not exist
var makeOuputDir = function (thumbPath) { return __awaiter(void 0, void 0, void 0, function () {
    var dir;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dir = fs_1.default.existsSync(thumbPath);
                if (!!dir) return [3 /*break*/, 2];
                return [4 /*yield*/, fs_1.promises.mkdir("".concat(thumbPath))];
            case 1:
                _a.sent();
                return [2 /*return*/, true];
            case 2: return [2 /*return*/, false];
        }
    });
}); };
exports.makeOuputDir = makeOuputDir;
var isInCache = function (reqParams, outputPath) {
    // check if the image is in the cache key and exists in the directory
    var inCache = cache.has("".concat(JSON.stringify(reqParams)));
    if (inCache &&
        fs_1.default.existsSync("".concat(outputPath).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))) {
        return true;
    }
    // set a key using the query parameters and a ttl of 2hr and 47 mn
    cache.set("".concat(JSON.stringify(reqParams)), JSON.stringify(reqParams), 10000);
    return false;
};
exports.isInCache = isInCache;
