package com.jiangren.bootcamp.java;

public class NumberSix implements IBottleNumber {

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
    return "1";
  }

  @Override
  public String container() {
    return "six-pack";
  }
}
