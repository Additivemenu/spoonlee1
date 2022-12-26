package javaCore.chap5.UniMelb.wk8Tut;

public class Cat extends Resident{

    public Cat(String name){
        super(name);
    }

    @Override
    public String describe(){
        return "Cat named " + getName();
    }

    @Override
    public String interact(){
        return "meowwww";
    }
}
