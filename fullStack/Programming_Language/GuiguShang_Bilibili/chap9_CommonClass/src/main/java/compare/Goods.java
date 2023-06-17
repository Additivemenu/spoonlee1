package compare;

/**
 * @author xueshuo
 * @create 2023-06-17 10:27 am
 */
public class Goods implements Comparable{
    private String name;
    private double price;

    public Goods() {
    }

    public Goods(String name, double price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Goods{" +
                "name='" + name + '\'' +
                ", price=" + price +
                '}';
    }

    // sort by price ascending, then sort by name ascending
    @Override
    public int compareTo(Object o) {
        if(o instanceof Goods){
            Goods goods = (Goods) o;

//            // 方式1
//            if(this.price > goods.price){
//                return 1;
//            } else if (this.price < goods.price) {
//                return -1;
//            }else {
//                return this.name.compareTo(goods.name);
//            }

            // 方式2:
            int compare = Double.compare(this.price, goods.price);
            if(compare == 0){
                compare = this.name.compareTo(goods.name);
            }
            return compare;
        }

        throw new RuntimeException("the argument input is not an instance of Goods!");
    }
}
