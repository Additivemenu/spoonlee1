package behaviourPattern.observer.AtGuigu.normalWay;

/**
 *
 * 想象这个类为气象站自己的网站
 *
 * @author xueshuo
 * @create 2023-05-01 8:30 pm
 */
public class CurrentConditions {
    private float temperature;
    private float pressure;
    private float humidity;

    // update()是由WeatherData来调用的, 我们这里使用的是推送模式
    public void update(float temperature,float pressure,float humidity){
        this.temperature=temperature;
        this.pressure=pressure;
        this.humidity=humidity;
        display();
    }


    public void display(){
        System.out.println("***Today mTemperature: "+temperature+"***");
        System.out.println("***Today mPressure: "+pressure+"***");
        System.out.println("***Today mHumidity: "+humidity+"***");
    }
}
