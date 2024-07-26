package customize_generics;

import java.util.ArrayList;
import java.util.List;

/**
 * @author xueshuo
 * @create 2023-03-18 2:43 pm
 */
public class SubOrder extends Order<Integer>{   // SubOrder不再是泛型类

    // P 568
    // 泛型方法: 在方法中出现了泛型的结构, 泛型参数与类的泛型没有任何关系
    // 换句话说, 泛型方法所属的类是不是泛型类都没有关系
    public <E> List<E> copyFromArrayToList(E[] arr){
        ArrayList<E> list = new ArrayList<>();

        for(E e:arr){
            list.add(e);
        }

        return list;
    }

}
