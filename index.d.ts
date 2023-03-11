declare class ReadContext {
    key: string;
    static newReadContext(key: string): ReadContext;
    listener(eventName: "data" | "finish", cb: Function): void;
}
export default class ReactNativeFileStream {
    static callBackMap: Map<any, any>;
    static initReadFile(file: {
        uri: string;
        fileName: string;
        fileSize: number;
    }, bufferSize: number, cb: Function): ReadContext | undefined;
}
export {};
