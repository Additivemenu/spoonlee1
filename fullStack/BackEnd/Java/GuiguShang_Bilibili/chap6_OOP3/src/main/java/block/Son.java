package block;

class Father {
	static {
		System.out.println("Father's 静态代码块");
	}

	{
		System.out.println("Father's 非静态代码块");
	}

	public Father() {
		System.out.println("Father 无参构造器");

	}

}

public class Son extends Father {
	static {
		System.out.println("Son's 静态代码块");
	}

	{
		System.out.println("Son's 非静态代码块");
	}

	public Son() {
		System.out.println("Son's 无参构造器");
	}


	public static void main(String[] args) { // 由父及子 静态先行
		// main 也是静态方法, 需要依赖类来调, 先加载son类, 再调用main

		System.out.println("77777777777");

		System.out.println("************************");
		new Son();

		System.out.println("************************");
		new Son();

		System.out.println("************************");
		new Father();
	}

}
