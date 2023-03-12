"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReactNativeFileStreamEventEmitter = exports.ReactNativeFileStreamModule = void 0;
var react_native_1 = require("react-native");
exports.ReactNativeFileStreamModule = react_native_1.NativeModules.ReactNativeFileStreamModule;
exports.ReactNativeFileStreamEventEmitter = new react_native_1.NativeEventEmitter(react_native_1.NativeModules.ReactNativeFileStreamModule);
