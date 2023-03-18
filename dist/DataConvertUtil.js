"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConvertUtil = void 0;
var base64_arraybuffer_1 = require("base64-arraybuffer");
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
            return (0, base64_arraybuffer_1.decode)(base64String);
        }
        catch (e) {
            throw e;
        }
    };
    DataConvertUtil.arryBufferToBase64 = function (buffer) {
        try {
            return (0, base64_arraybuffer_1.encode)(buffer);
        }
        catch (e) {
            throw e;
        }
    };
    return DataConvertUtil;
}());
exports.DataConvertUtil = DataConvertUtil;
