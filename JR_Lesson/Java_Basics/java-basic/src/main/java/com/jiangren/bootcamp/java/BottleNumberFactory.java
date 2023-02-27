package com.jiangren.bootcamp.java;

public class BottleNumberFactory {
  public IBottleNumber build(int i) {
    switch (i) {
      case -1:
        return new NumberNegativeOne();
      case 0:
        return new NumberZero();
      case 1:
        return new NumberOne();
      case 6:
        return new NumberSix();
      default:
        return new BottleNumber(i);
    }
  }
}
