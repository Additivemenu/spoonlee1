// match pattern with text, if find then return index

public class stringMatch{

   public static void main(String[] args)
   {
        String text = "I love coding!";
        String pattern = "od";

        int match = stringMatching(text, pattern);
        System.out.println("the index in text that matches with Pattern is "+ match);
   }

   // method
   public static int stringMatching(String text, String pattern){
        // convert String to array
        char[] arr_text = text.toCharArray();
        char[] arr_ptn = pattern.toCharArray();

        for (int i = 0; i<(arr_text.length-arr_ptn.length); i++){

            int correct =0;
            for(int j=0; j < arr_ptn.length;j++){
                if(arr_text[i+j] == arr_ptn[j]){
                    correct++;
                }else{
                    break;  // if not match, then turn to the next outer loop
                }
            }

            if(correct==arr_ptn.length){
                
                return i;
            }
          
        }
        return -1; // if not found pattern in text
    
   }

}