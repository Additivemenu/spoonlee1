package com.jiangren.bootcamp.java;

public class NumberNegativeOne implements IBottleNumber {
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
    return "99";
  }

  @Override
  public String container() {
    return "bottles";
  }
}
