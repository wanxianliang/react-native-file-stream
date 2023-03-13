# react-native-file-stream

### Description

Manipulating the file stream in a very convenient way **for android only**

## Getting started

`$ npm install react-native-file-stream --save`

### Mostly automatic installation(react native version <0.60)

`$ react-native link react-native-react-native-file-stream`

## Usage

#### Read file as stream

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
        //finish read
    }
    if (data) {
        //this is base64Data
    }
})
```

#### Write file as stream

```javascript
import ReactNativeFileStream from "react-native-file-stream";

//1. init file write stream
let path = "file://xxxx";
ReactNativeFileStream.initWriteFileStream(path);

//2.append data
let base64Data = "xxxxxx";
ReactNativeFileStream.writeFileStream(path, base64Data);

//3.stop write file
ReactNativeFileStream.stopWriteFileStream(path);
```

If you like this project, please add a star to [my Github Repo](https://github.com/wanxianliang/react-native-file-stream). Thanks!

That's all. Enjoy! :)