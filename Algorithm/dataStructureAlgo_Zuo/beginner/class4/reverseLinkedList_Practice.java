
public class reverseLinkedList_Practice {
    public static void main(String[] args)
    {
        // create nodes
		Node n1 = new Node(1); // n1's value is an address
		Node n2 = new Node(2); // 表达式new Node()构造了一个Node类型的对象, 它的值是对新创建对象的一个引用. 而这个引用存储在对象变量n2中.
		Node n3 = new Node(3); 
		// connect nodes
		n1.next = n2;
		n2.next = n3;
		n3.next = null;
		System.out.print(n1.value + "-->");
		System.out.print(n2.value + "-->");
		System.out.print(n3.value );

		System.out.println();

        // reverse list by function --------------
        Node newHead = reverseLinkedList(n1);
        Node currentNode = newHead;
        while ( currentNode != null){
            System.out.print(currentNode.value + "-->");
            currentNode = currentNode.next;
        }
 

		// reverse list by hand ------------
		// n3.next = n2;
		// n2.next = n1;
		// n1.next = null;
		// System.out.print(n3.value + "-->"); //3
		// System.out.print(n3.next.value + "-->");//2
		// System.out.println(n2.next.value ) ; // should be 1


    }

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

    public static Node reverseLinkedList(Node head) { // return a Node

		Node pre = null; // also a pointer
		Node next = null; // also a pointer, to record the next node before we change head

		while (head != null) { // loop over node, 这里用到了3个指针: pre, head, next

			next = head.next; // 记录原链表下一个node

			head.next = pre; // 反转链表操作: 当前Node的next指针指向原链表中上一个node

			pre = head; // pre 走向当前node

			head = next; // head 走向下一个node
		}
		//记得最后一定要return原链表尾node作为新链表的head!
		return pre; // when head is null, pre is the last node of original linkedlist, which is also the head of new linked list
	}
}

