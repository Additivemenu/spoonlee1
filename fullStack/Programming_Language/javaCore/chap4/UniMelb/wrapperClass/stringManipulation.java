package UniMelb.wrapperClass;

import java.util.Scanner;

public class stringManipulation {
    public static void main (String[] args) {
        System.out.println("Enter a one-line sentence:");
        Scanner keyboard = new Scanner(System.in);
        String sentence = keyboard.nextLine();
        
        sentence = sentence.toLowerCase();

        // captilize the first Character
        char firstCharacter = sentence.charAt(0);
        sentence = Character.toUpperCase(firstCharacter) + sentence.substring(1);

        // add '.' at the end of sentence of the last character of the sentence is a character or digit
        char lastCharacter = sentence.charAt(sentence.length()-1);
        if (Character.isDigit(lastCharacter)||Character.isLetter(lastCharacter)){
            sentence = sentence + '.';
        }
        // detect if there is a digit in the sentence
        char currentChar = 'a';
        for(int i=0; i<sentence.length();i++ ){
             currentChar = sentence.charAt(i);
            if (Character.isDigit(currentChar)){
                System.out.println("there is a digit in the sentence at the index of "+i);
                break;
            }
        }

        System.out.println("The revised sentence is:");
        System.out.println(sentence);
    }
}
