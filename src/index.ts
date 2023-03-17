import { DataConvertUtil } from "./DataConvertUtil";
import { ReactNativeFileStreamEventEmitter, ReactNativeFileStreamModule } from "./Native";

class ReactNativeFileStream {
    alreadyInitEventListener: boolean = false;
    callBackMap: Map<string, Function> = new Map();
    initEventListener(): void {
        ReactNativeFileStreamEventEmitter.addListener("log_from_native", msg => {
            console.log("log_from_native", msg);
        });
        ReactNativeFileStreamEventEmitter.addListener("file_read_data", (data: {
            key: string,
            data: string
        }) => {
            const key = data?.key;
            const base64Data = data?.data;
            if (!key || !base64Data) {
                console.log("read file error", data);
            }
            const callBack = this.callBackMap.get(key);
            if (callBack) {
                callBack.call(null, {
                    data: base64Data,
                    hasMore: true
                });
            }
        });
        ReactNativeFileStreamEventEmitter.addListener("file_Read_finish", data => {
            const key = data?.key;
            const callBack = this.callBackMap.get(key);
            if (callBack) {
                callBack.call(null, {
                    data: null,
                    hasMore: false
                });
            }
        });
        this.alreadyInitEventListener = true;
    };
    checkAndInitEventListener() {
        if (this.alreadyInitEventListener) {
            return;
        }
        this.initEventListener();
    };
    async readFileStream(file: {
        uri: string,
        fileName: string,
        fileSize: number
    }, bufferSize: number, cb: Function): Promise<boolean> {
        this.checkAndInitEventListener();
        let uri = file.uri;
        let key = file.fileName + file.fileSize;
        this.callBackMap.set(key, cb);
        let result = await ReactNativeFileStreamModule.startReadFileStream(uri, key, bufferSize);
        return result;
    };

    async initWriteFileStream(path: string): Promise<Boolean> {
        this.checkAndInitEventListener();
        let result = await ReactNativeFileStreamModule.initFileWrite(path);
        return result;
    };

    async writeFileStream(path: string, base64Data: string): Promise<Boolean> {
        if (!path || !base64Data) {
            return false;
        }
        this.checkAndInitEventListener();
        let result = await ReactNativeFileStreamModule.writeFileStream(path, base64Data);
        return result;
    };

    async stopWriteFileStream(path: string): Promise<Boolean> {
        if (!path) {
            return false;
        }
        this.checkAndInitEventListener();
        let result = await ReactNativeFileStreamModule.stopFileWrite(path);
        return result;
    };

}

const ReactNativeFileOperateStream = new ReactNativeFileStream();
export const DataConvertUtils = DataConvertUtil;
export default ReactNativeFileOperateStream;