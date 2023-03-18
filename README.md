# **react-native-file-stream**

### **Description**

The `react-native-file-stream` library provides a convenient way to manipulate file streams on Android.

## **Getting started**

To install the library, run the following command:

```
$ npm install react-native-file-stream --save
```

### **Mostly automatic installation (for React Native version < 0.60)**

To link the library, run the following command:

```
$ react-native link react-native-file-stream
```

### **Important**

#### The way we read file

![read](http://cdnqiniu.xiaozhitodo.com/tos/write.png)

#### The way we write file

![write](http://cdnqiniu.xiaozhitodo.com/tos/read.png)

### **Reading files**

**To read a file, follow these steps:**

1. Convert `base64Data` to `ArrayBuffer`. `ArrayBuffer` contains the original data.
2. Convert `ArrayBuffer` data to text or any other type of data you want.

### **Writing files**

**To write a file, follow these steps:**

1. Convert your origin data to `ArrayBuffer`.
2. Convert `ArrayBuffer` data to `base64Data`.
3. Invoke the `writeFileStream` method to write data.

## **Usage**

### **Read file as stream**

```javascript
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
        // Finish reading.
    }
    if (data) {
        // This is `base64Data`.
    }
})
```

### **Write file as stream**

```javascript
import ReactNativeFileStream from "react-native-file-stream";

// 1. Init file write stream.
let path = "file://xxxx";
ReactNativeFileStream.initWriteFileStream(path);

// 2. Append data.
let base64Data = "cGxlYXNlIGdpdmUgbWUgYSBzdGFydA==";
ReactNativeFileStream.writeFileStream(path, base64Data);

// 3. Stop writing file.
ReactNativeFileStream.stopWriteFileStream(path);
```

### **Data Conversion Methods**

```javascript
import ReactNativeFileStream, { DataConvertUtils } from "react-native-file-stream";

const base64DataStr = "cGxlYXNlIGdpdmUgbWUgYSBzdGFydA==";
const arrayBufferData = DataConvertUtils.base64ToArryBuffer(base64DataStr);
const base64Data2 = DataConvertUtils.arryBufferToBase64(arrayBufferData);

const unit8ArrayData = DataConvertUtils.base64ToUnit8Array(base64DataStr);
const base64Data3 = DataConvertUtils.unit8ArrayToBase64(unit8ArrayData);

```

If you find this project helpful, please give it a star on [my Github Repo](https://github.com/wanxianliang/react-native-file-stream). Thank you!
