class Main {
    static private int dangerMethod () throws ArithmeticException {
       throw new ArithmeticException ("example");
    }

    static public void caller () {
        int a;
        try {
            a = dangerMethod ();
        } catch (ArithmeticException e) {
            System.out.println(e.getMessage());
        }
    }

    static public void caller1 () throws ArithmeticException {
        int a = dangerMethod ();
    }

    static public void main (String[] args) {
        try {
            caller();
        } catch (ArithmeticException e) {
            System.out.println ("Main caught from caller");
        }

        try {
            caller1();
        } catch (ArithmeticException e) {
            System.out.println ("Main caught from caller1");
        }
    }
}

