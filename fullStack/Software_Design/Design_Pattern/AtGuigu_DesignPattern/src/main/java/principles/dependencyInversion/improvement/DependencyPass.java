package principles.dependencyInversion.improvement;

public class DependencyPass {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
//		// 方式一: 通过接口传递依赖
//		ChangHong changHong = new ChangHong();
//		OpenAndClose openAndClose = new OpenAndClose();
//		openAndClose.open(changHong);

//		// 方式二: 通过构造器进行依赖传递
//		ChangHong changHong = new ChangHong();
//		OpenAndClose openAndClose = new OpenAndClose(changHong);
//		openAndClose.open();

		// 方法三: 通过setter方法进行依赖传递
		ChangHong changHong = new ChangHong();
		OpenAndClose openAndClose = new OpenAndClose();
		openAndClose.setTv(changHong);
		openAndClose.open();

	}

}

//// 方式1: 通过接口传递实现依赖 --------------------------------------
//// 开关的接口
// interface IOpenAndClose {
// 	public void open(ITV tv); //抽象方法, 接收接口
// }
//
// interface ITV { //ITV接口
// 	public void play();
// }
//
// // 长虹电视机
// class ChangHong implements ITV {
//	@Override
//	public void play() {
//		// TODO Auto-generated method stub
//		System.out.println("changhong TV is opened");
//	}
// }
//// 实现接口
// class OpenAndClose implements IOpenAndClose{
//	 public void open(ITV tv){
//		tv.play();
//	 }
// }

//// 方式2: 通过构造方法依赖传递 -----------------------------------
//interface IOpenAndClose {
// 	public void open(); //抽象方法
//}
//interface ITV { //ITV接口
//	public void play();
//}
//
//// 实现类
//class OpenAndClose implements IOpenAndClose{
//	 public ITV tv; // 成员
//	 public OpenAndClose(ITV tv){ // 构造器
//	 	this.tv = tv;
//	 }
//	 public void open(){
//	 	this.tv.play();
//	 }
//}
//
//// 长虹电视机
//class ChangHong implements ITV {
//	@Override
//	public void play() {
//		// TODO Auto-generated method stub
//		System.out.println("changhong TV is opened");
//	}
//}



// 方式3: 通过setter方法传递 --------------------------------------
interface IOpenAndClose {
	public void open(); // 抽象方法

	public void setTv(ITV tv);
}

interface ITV { // ITV接口
	public void play();
}

class OpenAndClose implements IOpenAndClose {
	private ITV tv;

	public void setTv(ITV tv) {
		this.tv = tv;
	}

	public void open() {
		this.tv.play();
	}
}


// 长虹电视机
class ChangHong implements ITV {
	@Override
	public void play() {
		// TODO Auto-generated method stub
		System.out.println("changhong TV is opened");
	}
}