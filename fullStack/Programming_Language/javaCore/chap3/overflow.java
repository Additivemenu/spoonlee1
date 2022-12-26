package javaCore.chap3;

// demonstration of overflow for byte, short, float type
class overflow {
    public static void main (String[] args) throws InterruptedException {
        
        byte acc = 120;
        for (int i = 0; i < 30; i++) {
            System.out.println ("acc = " + acc); // overflows when acc =127
            acc++;
            Thread.sleep(1000);
        }
               
        short acc_s = 31000;
        for (int i = 0; i < 30; i++) {
            System.out.println("acc_s = " + acc_s); // overflows when acc_s hit its max
            acc_s += 100;
            Thread.sleep(1000);
        }
        
        float acc_f = 1;
        for (int i = 0; i < 40; i++) {
            System.out.println("acc_f = " + acc_f);
            acc_f *= 10;
            Thread.sleep(1000);
        }
    }
}