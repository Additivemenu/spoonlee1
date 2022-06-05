class bit{

    public static void print(int num){ // print binary form of num
        for(int i=31; i>=0; i--){
            System.out.print((num & (1 << i))==0?"0":"1"); 
            // 1<<i: 1 move leftward in i bits
            // num & (): examine which bit is 1, because only 1 & 1 = 1
        }
        System.out.println();
    }      


    public static void main(String[] args){
        
        // int num = 37; // int: 4 Byte or 32 bits; long: 8 Bytes or 64 bits

        // print(num);

        int test = 1;
        print(test);
        print(test<<1);
        print(test<<2);

        System.out.println("---------------------------------");

        int test2 = 123456;
        print(test2);
        print(test2<<1);
        print(test2<<2);
        //------------------------------------------------------
        int b = 123812311;
        int c = ~b; //reverse the binary bits 
        print(b);
        print(c);
        System.out.println("=================");
        //---------------------------------------------
        int aa = 123131231;
        int bb = 3881002;
        print(aa);
        print(bb);
        System.out.println("=================");
        print(aa|bb);
        print(aa&bb);
        print(aa^bb); //XOR


    }

}