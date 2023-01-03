package com.java8;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.function.Consumer;
import java.util.function.Predicate;

/**
 * https://www.bilibili.com/video/BV1Kb411W75N?p=672&vd_source=c6866d088ad067762877e4b6b23ab9df
 * Java内置的4大核心functional interfaces例子
 * Consumer<T>      void accept(T t)
 * Supplier<T>      T get()
 * Function<T, R>   apply(T t)
 * Predicate<T>     boolean test(T t)
 *
 *  Application: 将一个functional interface object作为一个function argument, 可以做到让function的内容随需求改变
 *  即将一个method(指functional interface中的abstract method)作为另一个method的argument
 *
 */
public class LambdaTest2 {
    @Test
    public void test1(){
        // normal way -------------------------------------------------------------
        happyTime(500, new Consumer<Double>() {    // this is a function whose second parameter is an object of a functional interface
            // in happyTime, we want to override the abstract method declared in the functional interface object which is an argument of happyTime
            @Override
            public void accept(Double aDouble) {
                System.out.println("Java is too hard, but Java is Profitable! salary: "+ aDouble);
            }
        });

        System.out.println("****************************");
        // Lambda写法: functional interface object transformed into Lambda ------------------------------------------
        happyTime(400, money->System.out.println("Lambda makes Java better! salary: "+ money));

    }

    public void happyTime(double money, Consumer<Double> con){
        con.accept(money);
    }

    // ==============================================================================================================================
    @Test
    public void test2(){

        List<String> list = Arrays.asList("Beijing", "Nanjing", "TianJing", "Dongjing", "Xian", "Pujing");
        List<String> filteredStringList = filterString(list, new Predicate<String>() {
            @Override
            public boolean test(String s) {
                return s.contains("jing");
            }
        });
        System.out.println(filteredStringList);

        // Lambda写法: 将functional interface object转化为Lambda表达式 -----------------------------------------------
        List<String> filterStr1 = filterString(list, s -> s.contains("jing") );
        System.out.println(filterStr1);
    }

    // 根据给定的规则, 过滤集合中的字符串. 此规则是由Predicate的test决定的
    public List<String> filterString(List<String> list, Predicate<String> pre  ){
        ArrayList<String> filterList = new ArrayList<>();
        for(String s:list){
            if(pre.test(s)){
                filterList.add(s);
            }

        }
        return filterList;
    }

}
