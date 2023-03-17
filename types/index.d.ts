import { DataConvertUtil } from "./DataConvertUtil";
declare class ReactNativeFileStream {
    alreadyInitEventListener: boolean;
    callBackMap: Map<string, Function>;
    initEventListener(): void;
    checkAndInitEventListener(): void;
    readFileStream(file: {
        uri: string;
        fileName: string;
        fileSize: number;
    }, bufferSize: number, cb: Function): Promise<boolean>;
    initWriteFileStream(path: string): Promise<Boolean>;
    writeFileStream(path: string, base64Data: string): Promise<Boolean>;
    stopWriteFileStream(path: string): Promise<Boolean>;
}
declare const ReactNativeFileOperateStream: ReactNativeFileStream;
export declare const DataConvertUtils: typeof DataConvertUtil;
export default ReactNativeFileOperateStream;
