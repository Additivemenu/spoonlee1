package Interface.Practice;

/**
 * @author xueshuo
 * @create 2023-01-29 11:15 am
 */
public class ComparableCircle extends Circle implements ComparableObject{


    public ComparableCircle(Double radius) {
        super(radius);
    }

    @Override
    public int compareTo(Object o) {
        if (this == o){
            return 0;
        }

        if(o instanceof ComparableCircle){
            ComparableCircle c = (ComparableCircle) o;      // 为什么要通过多态进行强制转换呢?
//            // 错误示例： casting may lead to lost of precision e.g. (int)(2.3 - 2.1) = 0
//            return (int)(this.getRadius() - c.getRadius());

//            // 正确写法1 当属性为基本数据类时
//            if(this.getRadius() > c.getRadius() ){
//                return 1;
//            }else if(this.getRadius() < c.getRadius()){
//                return -1;
//            }else {
//                return 0;
//            }

            // 正确写法2
            // 当属性声明为DOuble类型时, 可以直接调用wrapper class的封装好的方法
            return this.getRadius().compareTo(c.getRadius());

        }else{
            // return 0;

            // 应当去throw exception处理
            throw new RuntimeException("not matched data type");
        }

    }
}
