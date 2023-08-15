package com.jiangren.bootcamp.java;

public class NumberZero implements IBottleNumber {
  @Override
  public String action() {
    return "Go to the store and buy some more, ";
  }

  @Override
  public String pronoun() {
    return "one";
  }

  @Override
  public String numberString() {
    return "no more";
  }

  @Override
  public String container() {
    return "bottles";
  }
}
