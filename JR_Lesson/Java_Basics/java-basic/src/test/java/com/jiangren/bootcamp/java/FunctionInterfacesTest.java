package com.jiangren.bootcamp.java;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import static org.junit.jupiter.api.Assertions.assertEquals;

class FunctionInterfacesTest {

  private FunctionInterfaces f;

  private Outgoing outgoing = Mockito.mock(Outgoing.class);

  @BeforeEach
  public void setUp() {
     f = new FunctionInterfaces(outgoing);
  }

  @Test
  void testSetName() {
    f.setName("Fiona");
    assertEquals("Fiona", f.getName());
  }

  @Test
  void testCallOutGoing() {
    f.callOutgoing();
     Mockito.verify(outgoing).callMe();
  }

  @Test
  void tryFunction() {
    String test = "Message";
    assertEquals("Message from lambda", f.tryFunction(test));
  }

  @Test
  void tryPredict() {
    f.testPredicate();
  }

  @Test
  void tryFunctions() {
    f.tryFunctions();
  }

  @Test
  void tryBiFunction() {
    f.tryBiFunction();
  }
}