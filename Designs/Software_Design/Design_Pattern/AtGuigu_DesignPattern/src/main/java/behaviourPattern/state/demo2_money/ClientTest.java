package behaviourPattern.state.demo2_money;

/**������*/
public class ClientTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		Context context = new Context();

		context.setState(new PublishState());
        System.out.println(context.getCurrentState());
        
//        //publish --> not pay
        context.acceptOrderEvent(context);
//        //not pay --> paid
        context.payOrderEvent(context);

//        try {
//        	context.checkFailEvent(context);
//        	System.out.println("��������..");
//		} catch (Exception e) {
//			// TODO: handle exception
//			System.out.println(e.getMessage());
//		}
        
	}

}
