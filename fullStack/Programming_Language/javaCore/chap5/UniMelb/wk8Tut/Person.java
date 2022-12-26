package javaCore.chap5.UniMelb.wk8Tut;

public class Person extends Resident{
    public Person(String name){
        super(name);
    }

    @Override
    public String describe(){
        return "Person named " + getName();
    }

    @Override
    public String interact(){
        return "Hi, my name is " + getName() + ", it's nice to meet you";
    }
}
