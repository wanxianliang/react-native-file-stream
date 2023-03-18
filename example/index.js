import ReactNativeFileStream, { DataConvertUtils } from "react-native-file-stream";

const base64DataStr = "cGxlYXNlIGdpdmUgbWUgYSBzdGFydA==";
const arrayBufferData = DataConvertUtils.base64ToArryBuffer(base64DataStr);
const base64Data2 = DataConvertUtils.arryBufferToBase64(arrayBufferData);

const unit8ArrayData = DataConvertUtils.base64ToUnit8Array(base64DataStr);
const base64Data3 = DataConvertUtils.unit8ArrayToBase64(unit8ArrayData);


let bufferSize = 1024 * 127;
ReactNativeFileStream.readFileStream({
    uri: "content://xxxx.png",
    fileName: "xxxx.png",
    fileSize: 120023
}, bufferSize, (event) => {
    const data = event?.data;
    const hasMore = event?.hasMore;
    if (hasMore == false) {
        //finish read
    }
    if (data) {
        //this is base64Data
    }
})

//1. init file write stream
let path = "content://xxxx";
ReactNativeFileStream.initWriteFileStream(path);

//2.append data
let base64Data = "xxxxxx";
ReactNativeFileStream.writeFileStream(path, base64Data);

//3.stop write file
ReactNativeFileStream.stopWriteFileStream(path);
