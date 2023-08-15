package com.jiangren.bootcamp.java;

import org.apache.commons.lang3.StringUtils;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Bottles {

  private BottleNumberFactory bf = new BottleNumberFactory();
  public String verse(int i) {

    IBottleNumber bottle = bf.build(i);
    IBottleNumber nextBottle = bf.build(i - 1);
    return StringUtils.capitalize(bottle.numberString()) + " " + bottle.container() + " of beer on the wall, "
        + bottle.numberString() + " " + bottle.container() + " of beer.\n"
        + bottle.action()
        + nextBottle.numberString() + " " + nextBottle.container() + " of beer on the wall.";
  }

  public String verses(int high, int low) {
    return IntStream.rangeClosed(low, high)
        .mapToObj(i -> verse(high - i + low))
        .collect(Collectors.joining("\n\n"));
  }

  public String song() {
    return verses(99, 0);
  }
}
