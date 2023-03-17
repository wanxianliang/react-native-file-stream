"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConvertUtil = void 0;
var base64_arraybuffer_1 = __importDefault(require("base64-arraybuffer"));
var encode = base64_arraybuffer_1.default.encode, decode = base64_arraybuffer_1.default.decode;
var DataConvertUtil = /** @class */ (function () {
    function DataConvertUtil() {
    }
    DataConvertUtil.base64ToUnit8Array = function (base64String) {
        var arrayBuffer = DataConvertUtil.base64ToArryBuffer(base64String);
        return new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
    };
    DataConvertUtil.unit8ArrayToBase64 = function (unit8ArrayData) {
        return DataConvertUtil.arryBufferToBase64(unit8ArrayData.buffer);
    };
    DataConvertUtil.base64ToArryBuffer = function (base64String) {
        try {
            return decode(base64String);
        }
        catch (e) {
            throw e;
        }
    };
    DataConvertUtil.arryBufferToBase64 = function (buffer) {
        try {
            return encode(buffer);
        }
        catch (e) {
            throw e;
        }
    };
    return DataConvertUtil;
}());
exports.DataConvertUtil = DataConvertUtil;
