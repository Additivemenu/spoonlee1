package UniMelb;

import UniMelb.Bill;

public class BillingDialog {
    public static void main(String[] args)
	{
		System.out.println("Welcome to the law office of Better Call Saul!");

		Bill yourBill = new Bill();
		yourBill.inputTimeWorked();

		yourBill.updateFee();
		yourBill.outputBill();

		System.out.println("It has been a pleasure to serve you.");
	}
}
