"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var ReactNativeFileStreamModule = react_native_1.NativeModules.ReactNativeFileStreamModule;
// const eventEmitter = new NativeEventEmitter(ReactNativeFileStreamModule);
// eventEmitter.addListener("log_from_native", data => {
//     console.log("log_from_native", data);
// });
// eventEmitter.addListener("file_read_data", (data: {
//     key: string,
//     base64Data: string
// }) => {
//     const key = data?.key;
//     const base64Data = data?.base64Data;
//     if (!key || !data) {
//         console.log("read file error", data);
//     }
//     console.log("收到文件信息", base64Data.length);
//     const callBack = ReactNativeFileStream.callBackMap.get(key);
//     if (callBack) {
//         callBack.call(null, {
//             data: base64Data,
//             hasMore: true
//         });
//     }
// });
// eventEmitter.addListener("file_Read_finish", data => {
//     console.log('完成数据读取');
//     const key = data?.key;
//     const callBack = ReactNativeFileStream.callBackMap.get(key);
//     if (callBack) {
//         callBack.call(null, {
//             data: null,
//             hasMore: false
//         });
//     }
// });
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
