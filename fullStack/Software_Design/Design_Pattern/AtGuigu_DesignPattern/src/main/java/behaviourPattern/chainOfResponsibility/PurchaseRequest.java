package behaviourPattern.chainOfResponsibility;

/**
 * @author xueshuo
 * @create 2024-01-13 16:49
 */
public class PurchaseRequest {
    private int type=0;       // request type
    private float price = 0.0f;     // 请求金额
    private int id = 0;

    public PurchaseRequest(int type, float price, int id) {
        super();
        this.type = type;
        this.price = price;
        this.id = id;
    }

    public int getType() {
        return type;
    }

    public float getPrice() {
        return price;
    }

    public int getId() {
        return id;
    }
}
