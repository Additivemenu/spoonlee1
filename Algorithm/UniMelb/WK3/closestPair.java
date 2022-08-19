

public class closestPair {


    public static void main(String[] args)
    {   
        int particleNum = 20;
        int xend = 10;
        int yend = 10;

        double[][] particle = generateParticle(particleNum, xend, yend);
        System.out.println("The number of particles is " + particle.length);
        System.out.println("--------------------------------");

        for (int i = 0; i<particle.length; i++){
            System.out.printf("Particle %d: X is %5.3f, Y is %5.3f \n", i, particle[i][0], particle[i][1]);
        }
    }


    public static void closestPairSearch(){

    }

    public static double[][] generateParticle(int particleNum, int xend,  int yend){ // generate a two-dimensional array to represent the positions of particles
        
        int num = (int)(Math.random()*particleNum); //e.g. Math.random()*9 returns [0,9), then num ranges from {0,1,2,3,4,5,6,7,8} as (int) is leftward
        double[][] particle = new double[num][2];

        for (int i=0 ; i< num; i++){
            particle[i][0] = Math.random()*xend; // x position e.g. Math.random()*9 returns [0,9)
            particle[i][1] = Math.random()*yend; // y position 
        }

        return particle;
    }

}


