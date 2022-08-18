package UniMelb_bill;

import java.util.Scanner;

class Bill {
    public static double RATE = 150.00; //Dollars per quarter hour

	private int hours;
	private int minutes;
	private double fee;

	public void inputTimeWorked() 
	{
		Scanner keyboard = new Scanner(System.in);

		System.out.println("Enter the number of full hours worked:");
		hours = Integer.parseInt(keyboard.nextLine());
		System.out.println("Enter the number of minutes worked:");
		minutes = Integer.parseInt(keyboard.nextLine());
	}

    //uses the parameters minutesWorked as a local variable
	public double computeFee(int hoursWorked, int minutesWorked)
	{
		minutesWorked = hoursWorked * 60 + minutesWorked;
		int quarterHours = minutesWorked / 15; //any remaining fraction of a quarter hour is not charged for

		return quarterHours * RATE;
	}

	public void updateFee()
	{
		fee = computeFee(hours, minutes); //although minutes is plugged in for minutesWorked and minutesWorked is changed, the value of minutes is not changed
	}

	public void outputBill()
	{
		System.out.println("Time worked:");
		System.out.println(hours + " hours and " + minutes + " minutes");
		System.out.println("Rate: " + RATE + " per quarter hour.");
		System.out.println("Amount due: " + fee);
	}
}
