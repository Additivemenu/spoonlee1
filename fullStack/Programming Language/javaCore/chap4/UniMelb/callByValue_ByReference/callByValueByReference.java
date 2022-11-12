package UniMelb.callByValue_ByReference;

class Main {
    // fields --------------------------------
    int value;
    
    // constructor ----------------------------
    Main () {
        value = 0;
    }

    // Method ----------------------------------
    static Main tryIncrement1 (Main m) {
        m.value++;
        return m; // return class variable
    }

    static Main tryIncrement2 (Main m) {
        Main n = new Main ();
        n.value = m.value + 1;
        m = n; // assign  n's address to  m
        return m; // return class variable
    }

    public static void main (String[] arg) {
        Main m = new Main ();
        Main n = new Main ();

        /* Uncomment only one of the following lines */

        // n = tryIncrement1 (m); // m:1, n:1 因为把m的地址赋给了n
        // n = tryIncrement2 (m); // m:0, n:1 因为函数里没有对m.value进行赋值操作
        // m = tryIncrement1 (m); // m:1, n:0 n从头到尾没被操作过
        // m = tryIncrement2 (m); // m:1, n:0 n从头到尾没被操作过

        System.out.println ("Values are " + m.value + " " + n.value);
    }
}
