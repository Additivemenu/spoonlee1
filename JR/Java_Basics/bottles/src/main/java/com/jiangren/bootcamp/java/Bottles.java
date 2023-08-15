package com.jiangren.bootcamp.java;

import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Bottles {
    // fields--------------------------------------------

    // constructors--------------------------------------

    public Bottles(){

    }

    // methods--------------------------------------------
    public static void main(String[] args){
        Bottles bottlesTest = new Bottles();

        //System.out.println(bottlesTest.verse(0));
        System.out.println(bottlesTest.verses(2,0));
        //System.out.println(bottlesTest.song());
    }

    // 指定index为a, 打印对应的歌词
    public String verse(int a){
        String ans ="";

        // 用switch case也可
        if(a==0){
            ans = ans+"No more bottles of beer on the wall, no more bottles of beer.\n" +
                    "Go to the store and buy some more, 99 bottles of beer on the wall.";
        }else{
            ans = ans+ numberString(a) +" " + container(a) + " of beer on the wall, "+numberString(a)+" "+container(a)+" of beer.\n"
                    + "Take "+pronoun(a)+" down and pass it around, "+numberString(a-1) +" " + container(a-1)+" of beer on the wall.";
        }
        return ans;

    }


    public String pronoun(int i){
        if(i == 1){
            return "it";
        }else{
            return "one";
        }
    }

    public String numberString(int i){
        if(i == 0){
            return "no more";
        }else{
            return String.valueOf(i);
        }
    }


    // 复数为bottles, 单数为bottle
    public String container(int i){
        if(i == 1){
            return "bottle";
        }else{
            return "bottles";
        }
    }

    // 根据区间输出歌词
    public String verses(int hi, int lo){
//        // 方式一 常规方式
//        String ans = "";
//        for(int i=hi; i>=lo; i--){      // i rest at 1
//            ans= ans + verse(i);
//            if(i != lo){
//                ans = ans+"\n\n";
//            }
//        }
//        return ans;

        // 方式二: 用stream API
        return IntStream.rangeClosed(lo, hi)
                .mapToObj(i -> verse(hi - i + lo))      // verse(arg), arg从高到低调用
                .collect(Collectors.joining("\n\n"));

    }

    // 输出完整的song
    public String song(){
        String ans = "";
        ans = verses(99,0);
        return ans;
    }
}
