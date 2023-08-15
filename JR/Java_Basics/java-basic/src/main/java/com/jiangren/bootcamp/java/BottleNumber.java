package com.jiangren.bootcamp.java;

public class BottleNumber implements IBottleNumber {
  private int value;

  public BottleNumber(int value) {
    this.value = value;
  }

  @Override
  public String action() {
    return "Take " + pronoun() + " down and pass it around, ";
  }

  @Override
  public String pronoun() {
    return "one";
  }

  @Override
  public String numberString() {
    return String.valueOf(value);
  }

  @Override
  public String container() {
    return "bottles";
  }
}
