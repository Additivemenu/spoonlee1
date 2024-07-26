// Create a class hierarchy such that a Person "has a"
// WirelessDevice, a Phone "is a" WirelessDevice, and 
// a Notebook "is a" WirelessDevice.  Create a person 
// who has a phone and a person who has a notebook.

public class isaHasa_practice {
    public static void main (String[] args) {
        Person p = new Person();
        System.out.println(p.myPhone.getPhoneNum()); 
        System.out.println(p.myNoteBook.getNoteBooKId()); 
    }
}

// ========================================
class Person {
    // "has a"
    private Phone myPhone; 
    private Notebook myNoteBook;

    // constructors
    Person(){
        myPhone = new Phone();
        myNoteBook = new Notebook();
    }

    // methods
    // return an class type instance variable
    // public Phone getMyPhone(){
    //     return 
    // }

}
// base class =======================================
class WirelessDevice {
    boolean chargingPort;
    // constructors
    WirelessDevice(){
        this.chargingPort = true;
    }
    // methods
    public boolean getChargingPort(){
        return chargingPort;
    }
}
// derived class ========================================
class Phone extends WirelessDevice{
    private int phoneNum;
    // constructor
    Phone(int phoneNum){
        super();
        this.phoneNum = phoneNum;
    }

    Phone(){
        this(1234567);
    }

    public Phone(Phone original)
    {
        if (original == null)
        {
            System.out.println("Fatal error.");
            System.exit(1);
        }
        name = original.name;
        born = new Date(original.born); // 创建内存中新的object
        if (original.died == null)
            died = null;
        else
            died = new Date(original.died); // 创建内存中新的object
    }   

    //methods
    public int getPhoneNum(){
        return phoneNum;
    }
}
// derived class ========================================
class Notebook extends WirelessDevice{
    private int noteBookId;
    // constructors
    Notebook(int noteBookId){
        super();
        this.noteBookId = noteBookId;
    }
    Notebook(){
        this(131);
    }
    // methods
    public int getNoteBookId(){
        return noteBookId;
    }
}
