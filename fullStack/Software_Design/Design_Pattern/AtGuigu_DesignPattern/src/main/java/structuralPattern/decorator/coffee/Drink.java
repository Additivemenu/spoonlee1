package structuralPattern.decorator.coffee;

/**
 * @author xueshuo
 * @create 2023-04-18 1:28 pm
 */
public abstract class Drink {
    private String description;
    private float price = 0.0f;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    // 让子类去实现
    public abstract float cost();
}
