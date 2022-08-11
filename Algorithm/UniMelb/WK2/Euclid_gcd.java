// to compute the greatest common divisor of two integers
public class Euclid_gcd{
    public static void main(String[] args)
    {
        int gcd = gcd_Euclid(18, 81);
        System.out.println("gcd is: " + gcd);
    }
    
    public static int gcd_Euclid(int x, int y){

        int r;

        while(y!=0){
            // core operation:
            r=x%y;
            System.out.println(r);
            
            // updates for next iteration
            x=y;
            y=r;
        }

        return x;
    }
}