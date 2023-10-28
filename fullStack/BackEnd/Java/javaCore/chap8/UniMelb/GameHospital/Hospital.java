package javaCore.chap8.UniMelb.GameHospital;

/**
 * A Hospital for healing patients in.
 * @author TODO: Write your name here.
 */
import java.util.ArrayList;

// a hospital can only accommodate Player or Monster

public class Hospital<T extends Unit> {

    // fields------------------------------------------------
	private ArrayList<T> patients = new ArrayList<T>(); 

    // constructors-------------------------------------------
    public Hospital(){}


    // methods------------------------------------------------
	// accessor ---------------------------------
	public void displayStatus(){

        System.out.println("Hospital Status:");
        if(patients.size()==0){
            System.out.println("No patients.");
        }else{
            for(T ele:patients){
                ele.displayStatus();
            }
        }
	}

    // mutator ----------------------------------
	public void healPatients(){
		for(T ele:patients){
			ele.fullHeal();
		}
	}

	public void addPatient(T e){
		patients.add(e);
	}

	
}
