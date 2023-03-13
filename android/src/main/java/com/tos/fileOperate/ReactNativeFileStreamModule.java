package com.tos.fileOperate;

import android.net.Uri;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.tos.fileOperate.enums.EventNameEnum;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

public class ReactNativeFileStreamModule extends ReactContextBaseJavaModule {

  private static ReactApplicationContext reactContext = null;

  public ReactNativeFileStreamModule(ReactApplicationContext reactContext) {
    super(reactContext);
    ReactNativeFileStreamModule.reactContext = reactContext;
  }

  @Override
  public String getName() {
    return "ReactNativeFileStreamModule";
  }

  public static void sendDataToJs(String eventName, WritableMap data) {
    checkContextIsReady();
    ReactNativeFileStreamModule.reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(eventName, data);
  }

  public static void sendLogToJs(String log) {
    if (log == null || log.length() == 0) {
      return;
    }
    checkContextIsReady();
    WritableMap writableMap = new WritableNativeMap();
    writableMap.putString("log", log);
    ReactNativeFileStreamModule.reactContext
        .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
        .emit(EventNameEnum.LOG.getName(), writableMap);
  }

  private static void checkContextIsReady() {
    if (ReactNativeFileStreamModule.reactContext == null) {
      throw new RuntimeException("reactContext is null");
    }
  }

  @ReactMethod
  public void startReadFileStream(String path, String key, Integer bufferSize, Promise promise)
      throws IOException {
    if (isEmpty(path) || isEmpty(key) || bufferSize == null) {
      sendLogToJs("path、key and bufferSize is required");
      promise.resolve(false);
    }
    InputStream inputStream = null;
    if (path.startsWith("content")) {
      inputStream =
          Objects.requireNonNull(getCurrentActivity())
              .getContentResolver()
              .openInputStream(Uri.parse(path));
    } else {
      inputStream = new FileInputStream(path);
    }
    if (inputStream == null || inputStream.available() == 0) {
      sendLogToJs("inputStream is unAvailable");
      promise.resolve(false);
    }
    FileUtils.readFileStream((FileInputStream) inputStream, key, bufferSize);
    promise.resolve(true);
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  public boolean initFileWrite(String path) {
    if (isEmpty(path)) {
      sendLogToJs("path and key is required");
      return false;
    }
    String key = path;
    return FileUtils.initFileWrite(path, key);
  }

  @ReactMethod
  public boolean writeFileStream(String path, String base64Data) {
    if (isEmpty(path) || isEmpty(base64Data)) {
      return false;
    }
    FileUtils.writeFileStream(path, base64Data);
    return true;
  }

  @ReactMethod
  public boolean stopFileWrite(String path) {
    if (isEmpty(path)) {
      return false;
    }
    String key = path;
    FileUtils.stopFileWrite(key);
    return true;
  }

  public boolean isEmpty(String str) {
    return str == null || str.length() == 0;
  }
}
