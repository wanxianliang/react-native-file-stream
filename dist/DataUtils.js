"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataUtil = void 0;
var base64_arraybuffer_1 = __importDefault(require("base64-arraybuffer"));
var encode = base64_arraybuffer_1.default.encode, decode = base64_arraybuffer_1.default.decode;
var DataUtil = /** @class */ (function () {
    function DataUtil() {
    }
    DataUtil.base64ToUnit8Array = function (base64String) {
        var arrayBuffer = DataUtil.base64ToArryBuffer(base64String);
        return new Uint8Array(arrayBuffer, 0, arrayBuffer.byteLength);
    };
    DataUtil.unit8ArrayToBase64 = function (unit8ArrayData) {
        return DataUtil.arryBufferToBase64(unit8ArrayData.buffer);
    };
    DataUtil.base64ToArryBuffer = function (base64String) {
        try {
            return decode(base64String);
        }
        catch (e) {
            throw e;
        }
    };
    DataUtil.arryBufferToBase64 = function (buffer) {
        try {
            return encode(buffer);
        }
        catch (e) {
            throw e;
        }
    };
    return DataUtil;
}());
exports.DataUtil = DataUtil;
