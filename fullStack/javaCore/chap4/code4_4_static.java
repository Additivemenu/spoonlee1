public class code4_4_static {
    public static void main(String[] args)
    {
        
    }

    class Employee{
        private static int nextId =1;
        private int id;

        public void setId(){
            id = nextId;
            nextId++;
        }
    }

}
