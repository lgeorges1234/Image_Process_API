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
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-undef */
require("jasmine");
var fs_1 = __importStar(require("fs"));
var functions_1 = require("../../utilities/functions");
var variables_1 = require("../../utilities/variables");
describe('The filename exists in the public image directory', function () {
    it('the readDirectory function returns the image file name and extension when given an existing filename', function () { return __awaiter(void 0, void 0, void 0, function () {
        var filename, dirFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = 'aFileName';
                    return [4 /*yield*/, (0, functions_1.readDirectory)("".concat(variables_1.inputImageDirectory), "".concat(filename))];
                case 1:
                    dirFile = _a.sent();
                    expect(dirFile).toBe('aFileName.jpg');
                    return [2 /*return*/];
            }
        });
    }); });
    it('the readDirectory function return a null result when given a false filename', function () { return __awaiter(void 0, void 0, void 0, function () {
        var filename, dirFile;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filename = 'notaFileName';
                    return [4 /*yield*/, (0, functions_1.readDirectory)("".concat(variables_1.inputImageDirectory), "".concat(filename))];
                case 1:
                    dirFile = _a.sent();
                    expect(dirFile).toBeFalsy();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('The resize function provides an ouput path in the thumb/ directory', function () {
    it('providing width and height', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams, outputPath;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reqParams = {
                        filename: 'aFileName',
                        width: 300,
                        height: 400,
                    };
                    return [4 /*yield*/, (0, functions_1.resize)(reqParams, variables_1.inputImageDirectory, variables_1.outputImageDirectory)];
                case 1:
                    outputPath = _a.sent();
                    expect(outputPath).toBe("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"));
                    expect(fs_1.default.existsSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('providing no conform width or height', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    reqParams = {
                        filename: 'aFileName',
                        width: -1,
                        height: 400,
                    };
                    // const outputPath = await resize(
                    //   reqParams,
                    //   inputImageDirectory,
                    //   outputImageDirectory
                    // );
                    _a = expect;
                    return [4 /*yield*/, (0, functions_1.resize)(reqParams, variables_1.inputImageDirectory, variables_1.outputImageDirectory)];
                case 1:
                    // const outputPath = await resize(
                    //   reqParams,
                    //   inputImageDirectory,
                    //   outputImageDirectory
                    // );
                    _a.apply(void 0, [_b.sent()]).toThrow('Wrong parameters fot the resize function');
                    expect(fs_1.default.existsSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))).toBeFalse();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('The makeOutputDir function create an output thumb image', function () {
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        var files, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (fs_1.default.existsSync(variables_1.outputImageDirectory)) {
                        files = fs_1.default.readdirSync(variables_1.outputImageDirectory);
                        files.forEach(function (file) {
                            fs_1.default.unlinkSync("".concat(variables_1.outputImageDirectory, "/").concat(file));
                        });
                    }
                    return [4 /*yield*/, fs_1.promises.rmdir("".concat(variables_1.outputImageDirectory))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    err_1 = _a.sent();
                    console.log(err_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); });
    it('return true if the thumb/ does not exist ', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isThumbDirNotPresent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, functions_1.makeOuputDir)(variables_1.outputImageDirectory)];
                case 1:
                    isThumbDirNotPresent = _a.sent();
                    expect(isThumbDirNotPresent).toBeTrue();
                    expect(fs_1.default.existsSync(variables_1.outputImageDirectory)).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('return false if the thumb/ already exists', function () { return __awaiter(void 0, void 0, void 0, function () {
        var isThumbDirNotPresent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, functions_1.makeOuputDir)(variables_1.outputImageDirectory)];
                case 1:
                    isThumbDirNotPresent = _a.sent();
                    expect(isThumbDirNotPresent).toBeFalse();
                    expect(fs_1.default.existsSync(variables_1.outputImageDirectory)).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
});
describe('The isInCache function check if the thumb image has already been processed', function () {
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams;
        return __generator(this, function (_a) {
            try {
                reqParams = {
                    filename: 'aFileName',
                    width: 50,
                    height: 50,
                };
                if (fs_1.default.existsSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))) {
                    fs_1.default.unlinkSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"));
                }
            }
            catch (err) {
                console.log(err);
            }
            return [2 /*return*/];
        });
    }); });
    it('return false if the thumb image is not in cache', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams, inCache;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reqParams = {
                        filename: 'aFileName',
                        width: 50,
                        height: 50,
                    };
                    return [4 /*yield*/, (0, functions_1.resize)(reqParams, variables_1.inputImageDirectory, variables_1.outputImageDirectory)];
                case 1:
                    _a.sent();
                    inCache = (0, functions_1.isInCache)(reqParams, variables_1.outputImageDirectory);
                    expect(inCache).toBeFalse();
                    return [2 /*return*/];
            }
        });
    }); });
    it('return true if the thumb image is now in cache and is present in the folder', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams, inCache;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    reqParams = {
                        filename: 'aFileName',
                        width: 50,
                        height: 50,
                    };
                    return [4 /*yield*/, (0, functions_1.resize)(reqParams, variables_1.inputImageDirectory, variables_1.outputImageDirectory)];
                case 1:
                    _a.sent();
                    inCache = (0, functions_1.isInCache)(reqParams, variables_1.outputImageDirectory);
                    expect(inCache).toBeTrue();
                    expect(fs_1.default.existsSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))).toBeTrue();
                    return [2 /*return*/];
            }
        });
    }); });
    it('return false if the thumb image is in cache but is not present in the folder', function () { return __awaiter(void 0, void 0, void 0, function () {
        var reqParams, inCache;
        return __generator(this, function (_a) {
            reqParams = {
                filename: 'aFileName',
                width: 50,
                height: 50,
            };
            inCache = (0, functions_1.isInCache)(reqParams, variables_1.outputImageDirectory);
            expect(inCache).toBeFalse();
            expect(fs_1.default.existsSync("".concat(variables_1.outputImageDirectory).concat(reqParams.filename, "_").concat(reqParams.width, "_").concat(reqParams.height, "_thumb.jpg"))).toBeFalse();
            return [2 /*return*/];
        });
    }); });
});
