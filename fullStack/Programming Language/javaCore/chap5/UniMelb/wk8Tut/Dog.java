package wk8Tut;

public class Dog extends Resident{
    public Dog(String name){
        super(name);
    }

    @Override
    public String describe(){
        return "Dog named " + getName();
    }

    @Override
    public String interact(){
        return "woof woof";
    }
}
