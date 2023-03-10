package com.tos.fileOperate;

import android.net.Uri;
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
  public boolean startReadFileStream(String path, String key, Integer bufferSize)
      throws IOException {
    if (isEmpty(path) || isEmpty(key) || bufferSize == null) {
      sendLogToJs("path、key and bufferSize is required");
      return false;
    }
    InputStream inputStream =
        Objects.requireNonNull(getCurrentActivity())
            .getContentResolver()
            .openInputStream(Uri.parse(path));
    if (inputStream == null || inputStream.available() == 0) {
      sendLogToJs("inputStream is unAvailable");
      return false;
    }
    FileUtils.readFileStream((FileInputStream) inputStream, key, bufferSize);
    return true;
  }

  @ReactMethod
  public boolean initFileWrite(String path, String key) {
    if (isEmpty(path) || isEmpty(key)) {
      sendLogToJs("path and key is required");
      return false;
    }
    return FileUtils.initFileWrite(path, key);
  }

  @ReactMethod
  public boolean writeFileStream(String key, String base64Data) {
    if (isEmpty(key) || isEmpty(base64Data)) {
      return false;
    }
    FileUtils.writeFileStream(key, base64Data);
    return true;
  }

  @ReactMethod
  public boolean stopFileWrite(String key) {
    if (isEmpty(key)) {
      return false;
    }
    FileUtils.stopFileWrite(key);
    return true;
  }

  public boolean isEmpty(String str) {
    return str == null || str.length() == 0;
  }
}
