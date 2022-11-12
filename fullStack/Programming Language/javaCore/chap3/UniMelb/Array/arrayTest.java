package UniMelb.Array;

class arrayTest{

    public static double [] incrementArray(double[] a, double increment) {
        double [] temp = new double[a.length];
        for (int i = 0; i < a.length; i++)
            temp[i] = a[i] + increment;
        return temp;
    }

    public static void main (String[] args) {
        // Fill in if you want to call the above method
        double[] arr = {1.0,2.0,3.0,4.0};
        double [] arr2 = incrementArray(arr, 2.0);

        for (double ele:arr2){
            System.out.println(ele);
        }
    }
}