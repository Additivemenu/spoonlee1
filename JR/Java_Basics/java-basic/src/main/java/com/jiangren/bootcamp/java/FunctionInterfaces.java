package com.jiangren.bootcamp.java;

import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Predicate;

public class FunctionInterfaces {

  private String name;

  private Outgoing outgoing;

  public FunctionInterfaces(Outgoing outgoing) {
    this.outgoing = outgoing;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public void callOutgoing() {
    outgoing.callMe();
  }

  @FunctionalInterface
  public interface Foo {
    String method(String string);
  }

  private String add(String string, Foo foo) {
    return foo.method(string);
  }

  public String tryFunction(String message) {
    Foo foo = parameter -> parameter + " from lambda";
    return add(message, foo);
  }

  private boolean isPersonEligibleForVoting(Person person, Predicate<Person> predicate){
    return predicate.test(person);
  }

  public void testPredicate() {
    // Created a predicate. It returns true if age is greater than 18.
    Predicate<Person> predicate = p -> p.age > 18;

    Person person = new Person("Alex", 23);
    boolean eligible = isPersonEligibleForVoting(person , predicate);
    System.out.println("Person is eligible for voting: " + eligible);

    Person person2 = new Person("Fiona", 18);
    System.out.println("Person is eligible for voting: " + isPersonEligibleForVoting(person2, predicate));

    Optional<Person> p = Optional.empty();
    Person generated = p.orElseGet(() -> new Person("Lawrence", 21));
    System.out.println("Person is eligible for voting: " + isPersonEligibleForVoting(generated, predicate));
  }

  public void tryFunctions() {
    Function<String, Integer> lengthFunction = str -> str.length();
    System.out.println("String length: " + lengthFunction.apply("This is awesome!!"));

    Function<Integer, Integer> increment = x -> x + 10;
    Function<Integer, Integer> multiply = y -> y * 2;

    // Since we are using compose(), multiplication will be done first and then increment will be done.
    System.out.println("compose result: " + increment.compose(multiply).apply(3));

    // Since we are using andThen(), increment will be done first and then multiplication will be done.
    System.out.println("andThen result: " + increment.andThen(multiply).apply(3));
  }

  public void tryBiFunction() {
    BiFunction<Integer, Integer, String> add = (a, b) -> String.valueOf(a + b);

    System.out.println("Sum = " + add.apply(2, 3));
  }


  class Person {
    private String name;
    private int age;

    Person(String name, int age){
      this.name = name;
      this.age = age;
    }

    public int getAge() {
      return age;
    }

    public void setAge(int age) {
      this.age = age;
    }
  }
 }
