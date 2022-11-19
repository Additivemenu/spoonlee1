package UniMelb.Array;

class GradeBook {
    // fields
    private double[][] grade;
    private double[] studentAverage;
    private double[] quizAverage;
    // constructors
    public GradeBook(){
        grade = new double[][] {{10.0,10.0,10.0},{2.0,0.0,1.0},{8.0,6.0,9.0},{8.0,4.0,10.0}};
        studentAverage = new double[grade.length];
        quizAverage = new double[grade[0].length];
    }
    // methods
    public void getStudentAverage(){
        for (int i =0; i< grade.length;i++){
            studentAverage[i] = getAverage(grade[i]);
        }
    }

    public void getQuizAverage(){
        // temp array to store quiz i gradge
        double [] quizi = new double[grade.length]; // quizi[0] for student0's quiz

        for(int i=0; i<grade[0].length;i++){  // i: 0,1,2 loop over quiz
            // fill up quizi
            for(int j=0; j<grade.length;j++){ // j: 0,1,2,3, loop over student
                quizi[j] = grade[j][i];
            }

            // get average of quizi, then put the result into quizAverage
            quizAverage[i] = getAverage(quizi);
        }
    }

    // supportive method
    private double getAverage(double[] arr){
        double sum = 0;
        for(int i=0;i<arr.length;i++){
            sum = sum+arr[i];
        }
        return sum/arr.length;
    }

    // for testing------------------------------
    public static void main(String[] args){
        
        GradeBook myBook = new GradeBook();
        myBook.getQuizAverage();
        myBook.getStudentAverage();
        for (double ele:myBook.quizAverage){
            System.out.print(ele+", ");
        }

        System.out.println();

        for(double ele:myBook.studentAverage){
            System.out.print(ele+", ");
        }
    }
}