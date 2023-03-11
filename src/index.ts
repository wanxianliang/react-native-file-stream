
import { NativeEventEmitter, NativeModules } from 'react-native';

const { ReactNativeFileStreamModule } = NativeModules;

const eventEmitter = new NativeEventEmitter(ReactNativeFileStreamModule);

eventEmitter.addListener("log_from_native", data => {
    console.log("log_from_native", data);
});

eventEmitter.addListener("file_read_data", (data: {
    key: string,
    base64Data: string
}) => {
    const key = data?.key;
    const base64Data = data?.base64Data;
    if (!key || !data) {
        console.log("read file error", data);
    }
    console.log("收到文件信息", base64Data.length);
    const callBack = ReactNativeFileStream.callBackMap.get(key);
    if (callBack) {
        callBack.call(null, {
            data: base64Data,
            hasMore: true
        });
    }
});

eventEmitter.addListener("file_Read_finish", data => {
    console.log('完成数据读取');
    const key = data?.key;
    const callBack = ReactNativeFileStream.callBackMap.get(key);
    if (callBack) {
        callBack.call(null, {
            data: null,
            hasMore: false
        });
    }
});

export default class ReactNativeFileStream {

    static callBackMap = new Map();

    static async readFileAsBuffer(file: {
        uri: string,
        fileName: string,
        fileSize: number
    }, bufferSize: number, cb: Function) {
        let uri = file.uri;
        let key = file.fileName + file.fileSize;
        this.callBackMap.set(key, cb);
        ReactNativeFileStreamModule.startReadFileStream(uri, key, bufferSize);
    }

}

