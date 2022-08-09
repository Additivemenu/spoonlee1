
import java.util.ArrayList;
import java.util.List; // collections API: defines a spectrum of operations on lists

public class Code01_ReverseList {

	// p1: define class =======================================================================
	// class: single linked list-----------------------------------------
	public static class Node {
		// field
		public int value;
		public Node next; // date type is the same as class name, indicating 'next' actually is a "pointer" (referencing)
		// then you would need following coding to make it behave like a linkedlist pointer
		//------------------------------------
		// Node first = new Node();
		// Node second = new Node();
		// first.next = second;
		//-------------------------------------
		
		// constructor
		public Node(int data) {
			value = data;
		}
	}

	// class: double linked list-------------------------------------------
	 public static class DoubleNode {
		// field
		public int value;
		public DoubleNode last;
		public DoubleNode next;
		// Constructor
		public DoubleNode(int data) {
			value = data;
		}
	}

	// p2: function ============================================================================
	//单链表反转------------------------------------------------------------------
	public static Node reverseLinkedList(Node head) { // return a Node

		Node pre = null; // also a pointer
		Node next = null; // also a pointer, to record the next node before we change head

		while (head != null) { // loop over node, 这里用到了3个指针: pre, head, next

			next = head.next; // 记录原链表下一个node

			head.next = pre; // 反转链表操作: 当前Node的next指针指向原链表中上一个node

			pre = head; // pre 走向当前node

			head = next; // head 走向下一个node
		}
		//记得最后一定要return原链表尾node作为新链表的head
		return pre; // when head is null, pre is the last node of original linkedlist, which is also the head of new linked list
	}

	// 双链表反转--------------------------------------------------------------------------
	public static DoubleNode reverseDoubleList(DoubleNode head) {
		DoubleNode pre = null;
		DoubleNode next = null;
		while (head != null) {
			next = head.next;
			head.next = pre;
			head.last = next;
			pre = head;
			head = next;
		}
		return pre;
	}

	//
	public static Node testReverseLinkedList(Node head) {
		if (head == null) {
			return null;
		}
		ArrayList<Node> list = new ArrayList<>();
		while (head != null) {
			list.add(head);
			head = head.next;
		}
		list.get(0).next = null;
		int N = list.size();
		for (int i = 1; i < N; i++) {
			list.get(i).next = list.get(i - 1);
		}
		return list.get(N - 1);
	}

	public static DoubleNode testReverseDoubleList(DoubleNode head) {
		if (head == null) {
			return null;
		}
		ArrayList<DoubleNode> list = new ArrayList<>();
		while (head != null) {
			list.add(head);
			head = head.next;
		}
		list.get(0).next = null;
		DoubleNode pre = list.get(0);
		int N = list.size();
		for (int i = 1; i < N; i++) {
			DoubleNode cur = list.get(i);
			cur.last = null;
			cur.next = pre;
			pre.last = cur;
			pre = cur;
		}
		return list.get(N - 1);
	}

	// 单链表对数器------------------------------------------------------------
	public static Node generateRandomLinkedList(int len, int value) {
		int size = (int) (Math.random() * (len + 1));

		if (size == 0) {
			return null;
		}

		size--;

		Node head = new Node((int) (Math.random() * (value + 1)));
		Node pre = head; // pre as an intermediate Node variable 

		// generate singular linkedlist
		while (size != 0) {
			Node cur = new Node((int) (Math.random() * (value + 1))); // generate a node with a random value

			pre.next = cur; // 连接指针

			pre = cur; // 换下一个
			size--;
		}
		return head;
	}

	// for test
	public static DoubleNode generateRandomDoubleList(int len, int value) {
		int size = (int) (Math.random() * (len + 1));
		if (size == 0) {
			return null;
		}
		size--;
		DoubleNode head = new DoubleNode((int) (Math.random() * (value + 1)));
		DoubleNode pre = head;
		while (size != 0) {
			DoubleNode cur = new DoubleNode((int) (Math.random() * (value + 1)));
			pre.next = cur;
			cur.last = pre;
			pre = cur;
			size--;
		}
		return head;
	}

	// for test
	public static List<Integer> getLinkedListOriginOrder(Node head) {
		List<Integer> ans = new ArrayList<>();
		while (head != null) {
			ans.add(head.value);
			head = head.next;
		}
		return ans;
	}

	// for checking ------------------------------------------------------------------
	public static boolean checkLinkedListReverse(List<Integer> origin, Node head) {
		for (int i = origin.size() - 1; i >= 0; i--) {
			if (!origin.get(i).equals(head.value)) {
				return false;
			}
			head = head.next;
		}
		return true;
	}

	// for test
	public static List<Integer> getDoubleListOriginOrder(DoubleNode head) {
		List<Integer> ans = new ArrayList<>();
		while (head != null) {
			ans.add(head.value);
			head = head.next;
		}
		return ans;
	}

	// for checking--------------------------------------------------------------------
	public static boolean checkDoubleListReverse(List<Integer> origin, DoubleNode head) {
		DoubleNode end = null;
		for (int i = origin.size() - 1; i >= 0; i--) {
			if (!origin.get(i).equals(head.value)) {
				return false;
			}
			end = head;
			head = head.next;
		}
		for (int i = 0; i < origin.size(); i++) {
			if (!origin.get(i).equals(end.value)) {
				return false;
			}
			end = end.last;
		}
		return true;
	}

	
	public static void f(Node head) {
		head = head.next;
	}
	
	// main ================================================================================================
	public static void main(String[] args) {

		//Node n1 = new Node(1);  // 表达式new Node()构造了一个Node类型的对象, 它的值是对新创建对象的一个引用. 而这个引用存储在对象变量n1中.
		//n1.next = new Node(2);  // Java中任何的对象变量都是对对象的引用而不是真的对象, 把n1.next看作指针, new Node(2)是新建对象的地址
		//n1.next.next = new Node(3); // n1.next是n2的地址, 同时也是一个引用内存中对象的对象变量(也就是n2), 所以n1.next.next就是n2.next
		//reverseLinkedList(n1);
		//System.out.println(n1.value);

		// 用对数器进行大规模测试--------------------------------------------------------
		int len = 50;
		int value = 100;
		int testTime = 100000;
		System.out.println("test begin!");

		for (int i = 0; i < testTime; i++) {
			// 单链表------------------------------------------------------------
			Node node1 = generateRandomLinkedList(len, value);
			List<Integer> list1 = getLinkedListOriginOrder(node1);
			node1 = reverseLinkedList(node1);
			if (!checkLinkedListReverse(list1, node1)) {
				System.out.println("Oops1!");
			}

			Node node2 = generateRandomLinkedList(len, value);
			List<Integer> list2 = getLinkedListOriginOrder(node2);
			node2 = testReverseLinkedList(node2);
			if (!checkLinkedListReverse(list2, node2)) {
				System.out.println("Oops2!");
			}
			// 双链表-------------------------------------------------------------
			DoubleNode node3 = generateRandomDoubleList(len, value);
			List<Integer> list3 = getDoubleListOriginOrder(node3);
			node3 = reverseDoubleList(node3);
			if (!checkDoubleListReverse(list3, node3)) {
				System.out.println("Oops3!");
			}

			DoubleNode node4 = generateRandomDoubleList(len, value);
			List<Integer> list4 = getDoubleListOriginOrder(node4);
			node4 = reverseDoubleList(node4);
			if (!checkDoubleListReverse(list4, node4)) {
				System.out.println("Oops4!");
			}

		}
		System.out.println("test finish!");

	}

}