// search for the particle pair in a group of particles with the smallest distance

public class closestPair {

    public static void main(String[] args)
    {   
        int particlesNum = 20;
        int xend = 10;
        int yend = 10;

        double[][] particles = generateRandomParticles(particlesNum, xend, yend); 
        System.out.println("The number of particless is " + particles.length);
        System.out.println("--------------------------------");

        for (int i = 0; i<particles.length; i++){
            System.out.printf("particles %d: X is %5.3f, Y is %5.3f \n", i, particles[i][0], particles[i][1]);
        }

        closestPairSearch(particles);
        
    }

    // method
    public static void closestPairSearch(double[][] particles){
        double xx;
        double yy;
        double dist;

        double min = 10000.0;
        int p1=0, p2=1; // used to memorize min distance particle pair

        for(int i=0; i<particles.length;i++){
            for(int j = i+1; j<particles.length; j++){

                xx = Math.pow((particles[i][0] - particles[j][0]),2);
                yy = Math.pow((particles[i][1] - particles[j][1]),2);
                dist = xx + yy;

                if (dist < min) {
                    min = dist;
                    p1 = i;
                    p2 = j;
                    
                }
                
            }
        }

        System.out.printf("the min dist between particles %d and %d is %f %n", p1, p2, min);
    }

    // 对数器--------------------------------------------------------------------------------------------
    public static double[][] generateRandomParticles(int particlesNum, int xend,  int yend){ 
        // generate a two-dimensional array to represent the positions of particless
        // xend, yend defines the computation domain
        int num = (int)(Math.random()*particlesNum); //e.g. Math.random()*9 returns [0,9), then num ranges from {0,1,2,3,4,5,6,7,8} as (int) is leftward
        double[][] particles = new double[num][2];

        for (int i=0 ; i< num; i++){
            particles[i][0] = Math.random()*xend; // x position e.g. Math.random()*9 returns [0,9)
            particles[i][1] = Math.random()*yend; // y position 
        }

        return particles;
    }

}


