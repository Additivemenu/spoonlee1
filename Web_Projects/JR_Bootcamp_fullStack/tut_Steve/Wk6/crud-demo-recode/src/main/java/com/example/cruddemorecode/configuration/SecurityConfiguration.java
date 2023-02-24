package com.example.cruddemorecode.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

/**
 * @author xueshuo
 * @create 2023-02-23 8:40 pm
 */

@EnableWebSecurity
@Configuration  // 一般和@Bean一起用
public class SecurityConfiguration {

    @Bean           // 用来修饰方法, 可以将方法的返回对象存起来;  @Component标注在Class上, 可以将Class变成instance存起来.
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf().disable()
                .authorizeRequests()
                .antMatchers( "/**").permitAll()
                .anyRequest().authenticated()
                .and().build();
        // csrf 保护get()方法之外的方法(e.g. post, patch, delete)免受互联网攻击, csrf().disable()表示免受这种保护, 一般前端用cookie才会启用
        // antMatchers("/**") 路径匹配: "/**"表示匹配根路径下的所有路径, "/*"表示匹配根路径下一层路径
    }
}
