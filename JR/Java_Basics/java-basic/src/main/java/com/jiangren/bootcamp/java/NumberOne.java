package com.jiangren.bootcamp.java;

public class NumberOne implements IBottleNumber {
  @Override
  public String action() {
    return "Take " + pronoun() + " down and pass it around, ";
  }

  @Override
  public String pronoun() {
    return "it";
  }

  @Override
  public String numberString() {
    return "1";
  }

  @Override
  public String container() {
    return "bottle";
  }
}
