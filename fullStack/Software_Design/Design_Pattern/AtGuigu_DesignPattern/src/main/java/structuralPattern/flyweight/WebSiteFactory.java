package structuralPattern.flyweight;

import java.util.HashMap;

/**
 * 网站的工厂类:
 * 1. 根据用户需求, 返回一个网站
 *
 * @author xueshuo
 * @create 2023-11-14 9:05 pm
 */
public class WebSiteFactory {

    // 集合, 充当池的作用
    private HashMap<String, ConcreteWebSite> pool = new HashMap<>();


    // 根据网站的类型, 返回一个网站, 如果没有就创建一个, 并放入池中
    public WebSite getWebSiteCategory(String type) {
        if (!pool.containsKey(type)) {
            pool.put(type, new ConcreteWebSite(type));

        }

        return (WebSite) pool.get(type);
    }


    // 获取网站分类的总数 (即pool里有多少个网站)
    public int getWebSiteCount(){
        return pool.size();
    }

}
