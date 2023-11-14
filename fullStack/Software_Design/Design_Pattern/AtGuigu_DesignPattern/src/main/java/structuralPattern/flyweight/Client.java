package structuralPattern.flyweight;

/**
 * @author xueshuo
 * @create 2023-11-14 9:25 pm
 */
public class Client {
    public static void main(String[] args) {

        WebSiteFactory webSiteFactory = new WebSiteFactory();

        // 用户要一个以新闻形式发布的网站
        WebSite webSite1 = webSiteFactory.getWebSiteCategory("news");
        webSite1.use(new User("user1"));

        // 用户要一个以blog形式发布的网站
        WebSite webSite2 = webSiteFactory.getWebSiteCategory("blog");
        webSite2.use(new User("user2"));

        // 用户要一个以blog形式发布的网站
        WebSite webSite3 = webSiteFactory.getWebSiteCategory("blog");
        webSite3.use(new User("user3"));

        // 用户要一个以blog形式发布的网站
        WebSite webSite4 = webSiteFactory.getWebSiteCategory("blog");
        webSite4.use(new User("user4"));

        System.out.println(webSite2 == webSite3);
        System.out.println("instance count in pool is: " + webSiteFactory.getWebSiteCount());        // 2
    }
}
