package behaviourPattern.observer.AtGuigu.observer_pattern;

/**
 * @author xueshuo
 * @create 2023-05-01 9:21 pm
 */
public class Baidu implements Observer{
    private float temperature;
    private float pressure;
    private float humidity;

    @Override
    // update()是由WeatherData来调用的, 我们这里使用的是推送模式
    public void update(float temperature,float pressure,float humidity){
        this.temperature=temperature;
        this.pressure=pressure;
        this.humidity=humidity;
        display();
    }

    public void display(){
        System.out.println("***百度气温: "+temperature+"***");
        System.out.println("***百度气压: "+pressure+"***");
        System.out.println("***百度湿度: "+humidity+"***");
    }
}
