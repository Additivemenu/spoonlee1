public class arrayCommandLine {
    public static void main(String[] args)
    {   
        // args is a String array receives message from command line, 
        // which would be used as the input for the main function
        
        // args[0]
        if(args.length == 0 || args[0].equals("-h"))
            System.out.println("Hello,");
        else if(args[0].equals("-g"))
            System.out.println("GoodBye,");

        // print the other command-line arguments: for args[1], args[2], args[3]....
        for(int i = 1; i<args.length; i++)
            System.out.println( "" + args[i]);
        System.out.println("!");
    }
}
