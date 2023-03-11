"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var ReactNativeFileStreamModule = react_native_1.NativeModules.ReactNativeFileStreamModule;
var eventEmitter = new react_native_1.NativeEventEmitter(ReactNativeFileStreamModule);
eventEmitter.addListener("log_from_native", function (data) {
    console.log("log_from_native", data);
});
eventEmitter.addListener("file_read_data", function (data) {
    var key = data === null || data === void 0 ? void 0 : data.key;
    var base64Data = data === null || data === void 0 ? void 0 : data.base64Data;
    if (!key || !data) {
        console.log("read file error", data);
    }
    console.log("收到文件信息", base64Data.length);
    var callBack = ReactNativeFileStream.callBackMap.get(key);
    if (callBack) {
        callBack.call(null, {
            data: base64Data,
            hasMore: true
        });
    }
});
eventEmitter.addListener("file_Read_finish", function (data) {
    console.log('完成数据读取');
    var key = data === null || data === void 0 ? void 0 : data.key;
    var callBack = ReactNativeFileStream.callBackMap.get(key);
    if (callBack) {
        callBack.call(null, {
            data: null,
            hasMore: false
        });
    }
});
var ReadContext = /** @class */ (function () {
    function ReadContext() {
        this.key = "";
    }
    ReadContext.newReadContext = function (key) {
        var readContext = new ReadContext();
        readContext.key = key;
        return readContext;
    };
    ReadContext.prototype.listener = function (eventName, cb) {
    };
    return ReadContext;
}());
var ReactNativeFileStream = /** @class */ (function () {
    function ReactNativeFileStream() {
    }
    ReactNativeFileStream.initReadFile = function (file, bufferSize, cb) {
        console.log("sssssssssssssssssss", file);
        throw new Error("ssss");
        var uri = file.uri;
        var key = file.fileName + file.fileSize;
        this.callBackMap.set(key, cb);
        console.log("  this.callBackMap", this.callBackMap);
        var res = ReactNativeFileStreamModule.startReadFileStream(uri, key, bufferSize);
        if (!res) {
            return ReadContext.newReadContext(key);
        }
        return undefined;
    };
    ReactNativeFileStream.callBackMap = new Map();
    return ReactNativeFileStream;
}());
exports.default = ReactNativeFileStream;
