package com.tos.fileOperate;

import android.util.Base64;

import com.facebook.react.bridge.WritableNativeMap;
import com.tos.fileOperate.enums.EventNameEnum;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;

public class FileUtils {

  public static void sendLog(String msg) {
    ReactNativeFileStreamModule.sendLogToJs(msg);
  }

  private static HashMap<String, FileOutputStream> FILE_STORE = new HashMap<>(8);

  public static void readFileStream(FileInputStream inputStream, String key, Integer buffSize) {
    byte[] bytes = new byte[buffSize];
    boolean shouldRead = true;
    while (shouldRead) {
      int res = 0;
      try {
        res = inputStream.read(bytes);
      } catch (IOException e) {
        sendLog(e.getMessage());
        FILE_STORE.remove(key);
        return;
      }
      if (res == -1 || res == 0) {
        shouldRead = false;
        // send finish event
        WritableNativeMap writableNativeMap = new WritableNativeMap();
        writableNativeMap.putString("key", key);
        ReactNativeFileStreamModule.sendDataToJs(
            EventNameEnum.FILE_READ_FINISH.getName(), writableNativeMap);
        break;
      }
      if (res != buffSize) {
        // 切割
        bytes = Arrays.copyOfRange(bytes, 0, res);
        shouldRead = false;
      }
      // base64 返回
      String base64Data = Base64.encodeToString(bytes, Base64.DEFAULT);
      // 发送js base64Data
      WritableNativeMap param = new WritableNativeMap();
      param.putString("data", base64Data);
      param.putString("key", key);
      ReactNativeFileStreamModule.sendDataToJs(EventNameEnum.FILE_READ_DATA.getName(), param);
      if (!shouldRead) {
        // send finish event
        WritableNativeMap writableNativeMap = new WritableNativeMap();
        writableNativeMap.putString("key", key);
        ReactNativeFileStreamModule.sendDataToJs(
                EventNameEnum.FILE_READ_FINISH.getName(), writableNativeMap);
      }
    }
  }

  public static boolean initFileWrite(String path, String fileKey) {
    FileOutputStream fileOutputStream = null;
    try {
      fileOutputStream = new FileOutputStream(path);
    } catch (Exception e) {
      sendLog(e.getMessage());
      e.printStackTrace();
      return false;
    }
    FILE_STORE.put(fileKey, fileOutputStream);
    return true;
  }

  public static void stopFileWrite(String key) {
    FileOutputStream fileOutputStream = FILE_STORE.get(key);
    if (fileOutputStream == null) {
      return;
    }
    try {
      fileOutputStream.close();
    } catch (IOException e) {
      sendLog(e.getMessage());
      e.printStackTrace();
    }
    FILE_STORE.remove(key);
  }

  public static void writeFileStream(String key, String base64Data) {
    FileOutputStream fileOutputStream = FILE_STORE.get(key);
    if (fileOutputStream == null) {
      return;
    }
    // convert base64 to bytes
    byte[] bytes = Base64.decode(base64Data, Base64.DEFAULT);
    try {
      fileOutputStream.write(bytes);
    } catch (IOException e) {
      sendLog(e.getMessage());
      e.printStackTrace();
    }
  }
}
