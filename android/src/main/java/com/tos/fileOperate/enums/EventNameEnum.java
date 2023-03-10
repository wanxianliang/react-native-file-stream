package com.tos.fileOperate.enums;

public enum EventNameEnum {
  LOG("log_from_native"),
  FILE_READ_DATA("file_read_data"),
  FILE_READ_FINISH("file_Read_finish");

  private String name;

  EventNameEnum(String name) {
    this.name = name;
  }

  public String getName() {
    return this.name;
  }
}
