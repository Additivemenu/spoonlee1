package behaviourPattern.observer.AtGuigu.observer_pattern;

/**
 * @author xueshuo
 * @create 2023-05-01 9:07 pm
 */
public class CurrentCondition implements Observer{
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
        System.out.println("***Today mTemperature: "+temperature+"***");
        System.out.println("***Today mPressure: "+pressure+"***");
        System.out.println("***Today mHumidity: "+humidity+"***");
    }
}
