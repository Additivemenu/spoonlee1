package com.example.cruddemorecode.configuration;

import com.example.cruddemorecode.filter.EmailAndPasswordFilter;
import com.example.cruddemorecode.service.ApplicationUserService;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.List;

/**
 * @author xueshuo
 * @create 2023-02-23 8:40 pm
 */

@Setter
@EnableWebSecurity
@Configuration  // 一般和@Bean一起用
@ConfigurationProperties(prefix = "management.endpoints.web.cors")  // 需要class里有setter, 这里是指示去读取appication.yml中的key为"management.endpoints.web.cors"数据
@RequiredArgsConstructor
public class SecurityConfiguration {

    private List<String> allowedOrigins;        // 在本地环境, UAT环境, production环境的前端的origin的IP:port是不同的(他们是环境变量, 一般我们把他们写到不同的application.yml文件里), 不写死为了提高代码的适用型
    private List<String> allowedMethods;
    private List<String> allowedHeaders;
    private List<String> exposedHeaders;

    private final ApplicationUserService applicationUserService;   // 需要@RequiredArgsConstructor, 它自己被@Service修饰过会被IOC自动依赖注入 ******************


    @Bean           // 用来修饰方法, 可以将方法的返回对象存起来;  @Component标注在Class上, 可以将Class变成instance存起来.
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()       // disable 了一层 filter, spring security默认提供了大概10层filter
                .cors().configurationSource(request -> {        // 实际上是对cors的'改'
                    var cors = new CorsConfiguration();
                    cors.setAllowedMethods(allowedMethods);
                    cors.setAllowedOrigins(allowedOrigins);
                    cors.setAllowedHeaders(allowedHeaders);
                    cors.setExposedHeaders(exposedHeaders);
                    return cors;
                })
                .and()      //不用纠结, 这就是spring security的语法, 怎么设计的我们就怎么写
                .addFilter(new EmailAndPasswordFilter(authenticationManager()))
                .authorizeRequests()
                .antMatchers( "/**").permitAll()
                .anyRequest().authenticated()
                .and().build();
        // csrf 保护get()方法之外的方法(e.g. post, patch, delete)免受互联网攻击, csrf().disable()表示免受这种保护, 一般前端用cookie才会启用
        // antMatchers("/**") 路径匹配: "/**"表示匹配根路径下的所有路径, "/*"表示匹配根路径下一层路径
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    // 依赖注入*****************************************************
    public AuthenticationManager authenticationManager(){

        DaoAuthenticationProvider daoAuthenticationProvider = new DaoAuthenticationProvider();
        daoAuthenticationProvider.setUserDetailsService(applicationUserService);        // 注入依赖
        daoAuthenticationProvider.setPasswordEncoder(passwordEncoder());        // 需要passwordEncoder来比对用户输入的明文密码和数据库中的密文密码

        return  new ProviderManager(daoAuthenticationProvider);     // 注入依赖, 返回AuthenticationManager的实现类
    }
}
