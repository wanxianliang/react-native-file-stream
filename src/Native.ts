
import { NativeEventEmitter, NativeModules } from 'react-native';

export const ReactNativeFileStreamModule = NativeModules.ReactNativeFileStreamModule;

export const ReactNativeFileStreamEventEmitter = new NativeEventEmitter(
    NativeModules.ReactNativeFileStreamModule
);
