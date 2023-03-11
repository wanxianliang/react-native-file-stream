export default class ReactNativeFileStream {
    static callBackMap: Map<any, any>;
    static readFileAsBuffer(file: {
        uri: string;
        fileName: string;
        fileSize: number;
    }, bufferSize: number, cb: Function): Promise<void>;
}
