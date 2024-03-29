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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
exports.DataConvertUtils = void 0;
var DataConvertUtil_1 = require("./DataConvertUtil");
var Native_1 = require("./Native");
var ReactNativeFileStream = /** @class */ (function () {
    function ReactNativeFileStream() {
        this.alreadyInitEventListener = false;
        this.callBackMap = new Map();
    }
    ReactNativeFileStream.prototype.initEventListener = function () {
        var _this = this;
        Native_1.ReactNativeFileStreamEventEmitter.addListener("log_from_native", function (msg) {
            console.log("log_from_native", msg);
        });
        Native_1.ReactNativeFileStreamEventEmitter.addListener("file_read_data", function (data) {
            var key = data === null || data === void 0 ? void 0 : data.key;
            var base64Data = data === null || data === void 0 ? void 0 : data.data;
            if (!key || !base64Data) {
                console.log("read file error", data);
            }
            var callBack = _this.callBackMap.get(key);
            if (callBack) {
                callBack.call(null, {
                    data: base64Data,
                    hasMore: true
                });
            }
        });
        Native_1.ReactNativeFileStreamEventEmitter.addListener("file_Read_finish", function (data) {
            var key = data === null || data === void 0 ? void 0 : data.key;
            var callBack = _this.callBackMap.get(key);
            if (callBack) {
                callBack.call(null, {
                    data: null,
                    hasMore: false
                });
            }
        });
        this.alreadyInitEventListener = true;
    };
    ;
    ReactNativeFileStream.prototype.checkAndInitEventListener = function () {
        if (this.alreadyInitEventListener) {
            return;
        }
        this.initEventListener();
    };
    ;
    ReactNativeFileStream.prototype.readFileStream = function (file, bufferSize, cb) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, key, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAndInitEventListener();
                        uri = file.uri;
                        key = file.fileName + file.fileSize;
                        this.callBackMap.set(key, cb);
                        return [4 /*yield*/, Native_1.ReactNativeFileStreamModule.startReadFileStream(uri, key, bufferSize)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ;
    ReactNativeFileStream.prototype.initWriteFileStream = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.checkAndInitEventListener();
                        return [4 /*yield*/, Native_1.ReactNativeFileStreamModule.initFileWrite(path)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ;
    ReactNativeFileStream.prototype.writeFileStream = function (path, base64Data) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!path || !base64Data) {
                            return [2 /*return*/, false];
                        }
                        this.checkAndInitEventListener();
                        return [4 /*yield*/, Native_1.ReactNativeFileStreamModule.writeFileStream(path, base64Data)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ;
    ReactNativeFileStream.prototype.stopWriteFileStream = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!path) {
                            return [2 /*return*/, false];
                        }
                        this.checkAndInitEventListener();
                        return [4 /*yield*/, Native_1.ReactNativeFileStreamModule.stopFileWrite(path)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    ;
    return ReactNativeFileStream;
}());
var ReactNativeFileOperateStream = new ReactNativeFileStream();
exports.DataConvertUtils = DataConvertUtil_1.DataConvertUtil;
exports.default = ReactNativeFileOperateStream;
