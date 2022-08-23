// this code is from UniMelb java
// run this code using:  java UniMelb.staticMethod.SharePrice 10 20 5

package UniMelb.staticMethod;

class SharePrice {
    static public void main (String[] args) {
        Holding account1 = new Holding(Double.parseDouble(args[0])); 
        Holding account2 = new Holding(Double.parseDouble(args[1]));

        Holding.setPrice (Double.parseDouble(args[2])); // set up static variable

        System.out.println("Account 1 is worth " + account1.value());
        System.out.println("Account 2 is worth " + account2.value());
    }
}

class Holding {
    // fields--------------------------------
    private double shareNum; // share number（股数） in an account
    private static double pricePerShare; // 每股价格

    // constructor---------------------------
    public Holding(double sN){
        shareNum = sN;
    }

    // method--------------------------------
    public static void setPrice(double apricePerShare){
        pricePerShare = apricePerShare;
    }

    public double value(){
        return shareNum*pricePerShare; //???? non-static method can access static field
    }
}