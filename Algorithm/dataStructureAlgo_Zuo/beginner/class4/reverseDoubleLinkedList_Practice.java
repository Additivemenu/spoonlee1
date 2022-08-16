public class reverseDoubleLinkedList_Practice {
    public static void main(String[] args)
    {
        // create nodes
		dNode n1 = new dNode(1); // n1's value is an address
		dNode n2 = new dNode(2); // 表达式new Node()构造了一个Node类型的对象, 它的值是对新创建对象的一个引用. 而这个引用存储在对象变量n2中.
		dNode n3 = new dNode(3); 
		// connect nodes
		n1.next = n2;
		n2.next = n3;
		n3.next = null;

        n3.pre=n2;
        n2.pre=n1;
        n1.pre=null;
        // display linked list
        orderDisplayLinkedList(n1);
        reverseOrderDisplayLinkedList(n3);

        // 用对数器
        dNode head1 = generateRandomDoubleList(10, 10);
        orderDisplayLinkedList(head1);
        // // delete an inner node
        // deleteNode(n2);
        // orderDisplayLinkedList(n1);
        // reverseOrderDisplayLinkedList(n3);

        // // delete a boundary node
        // deleteNode(n3);
        // orderDisplayLinkedList(n1);
        // reverseOrderDisplayLinkedList(n2);
    }

    // class=========================================================
    public static class dNode {
        // field
        public int value;
        public dNode next; // date type is the same as class name, indicating 'next' actually is a "pointer" (referencing)
        public dNode pre;
        // then you would need following coding to make it behave like a linkedlist pointer
        //------------------------------------
        // Node first = new Node();
        // Node second = new Node();
        // first.next = second;
        //-------------------------------------
        
        // constructor
        public dNode(int data) {
            value = data;
        }
    }

    // methods===========================================================
    // 顺序打印链表
    public static void orderDisplayLinkedList(dNode head){
        dNode order = head; // 顺序指针

        while(order != null){
            System.out.print(order.value + "-->");
            order=order.next;
        }

        System.out.println();
    }

    //逆序打印链表
    public static void reverseOrderDisplayLinkedList(dNode tail){
        dNode reverseOrder = tail; // 顺序指针

        while(reverseOrder != null){
            System.out.print(reverseOrder.value + "-->");
            reverseOrder=reverseOrder.pre;
        }

        System.out.println();
    }

    // 删除双链表某节点
    public static void deleteNode(dNode node){
        // first find out pre and next node
        dNode preNode = node.pre;
        dNode nextNode = node.next;

        //Bcs: delete head node and tail node
        if (preNode == null) {
            nextNode.pre =null;
            //return new head?
        }else if (nextNode == null){
            preNode.next = null;
            // return new tail?
        }
        else{
        // connect preNode and nextNode
        preNode.next = nextNode;
        nextNode.pre = preNode;
        }


    }

    public static dNode generateRandomDoubleList(int len, int value) {
		int size = (int) (Math.random() * (len + 1));
		if (size == 0) {
			return null;
		}
		size--;

		dNode head = new dNode((int) (Math.random() * (value + 1)));
		dNode pre = head;
        // connect nodes
		while (size != 0) {
			dNode cur = new dNode((int) (Math.random() * (value + 1)));
			pre.next = cur;
			cur.pre = pre;
			pre = cur;
			size--;
		}
		return head;
	}
    
}
