import ReactNativeFileStream from "react-native-file-stream";

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
