
# react-native-react-native-file-stream

## Getting started

`$ npm install react-native-react-native-file-stream --save`

### Mostly automatic installation

`$ react-native link react-native-react-native-file-stream`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-react-native-file-stream` and add `RNReactNativeFileStream.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNReactNativeFileStream.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNReactNativeFileStreamPackage;` to the imports at the top of the file
  - Add `new RNReactNativeFileStreamPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-react-native-file-stream'
  	project(':react-native-react-native-file-stream').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-react-native-file-stream/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-react-native-file-stream')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNReactNativeFileStream.sln` in `node_modules/react-native-react-native-file-stream/windows/RNReactNativeFileStream.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using React.Native.File.Stream.RNReactNativeFileStream;` to the usings at the top of the file
  - Add `new RNReactNativeFileStreamPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNReactNativeFileStream from 'react-native-react-native-file-stream';

// TODO: What to do with the module?
RNReactNativeFileStream;
```
  