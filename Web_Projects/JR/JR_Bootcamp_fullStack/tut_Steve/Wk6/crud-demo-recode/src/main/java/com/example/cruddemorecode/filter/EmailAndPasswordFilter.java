package com.example.cruddemorecode.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.java.Log;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * @author xueshuo
 * @create 2023-02-25 11:06 am
 */
@RequiredArgsConstructor
public class EmailAndPasswordFilter extends UsernamePasswordAuthenticationFilter {


    private final AuthenticationManager authenticationManager;


    // TODO: 重写父类方法

    /**
     *
     * @param request from which to extract parameters and perform the authentication （用户的username和password会放在request）
     * @param response the response, which may be needed if the implementation has to do a
     * redirect as part of a multi-stage authentication process (such as OpenID).
     * @return
     * @throws AuthenticationException
     */
    @SneakyThrows
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException{

        // step1: 读取request(用户输入)的信息
        LoginRequest loginRequest = new ObjectMapper().readValue(request.getInputStream(), LoginRequest.class); // 读取json格式数据(request), 转化为Java object的形式

        // step2: 根据用户输入的email和password产生token
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword());

        // step3: authentication manager尝试验证刚刚产生的token
        return authenticationManager.authenticate(usernamePasswordAuthenticationToken);   // 接收一个token, 返回一个token
    }

    // attemptAuthentication 成功了进入这个方法
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
                                            Authentication authResult) throws IOException, ServletException {

    }

    // attemptAuthentication 失败了了进入这个方法
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
                                              AuthenticationException failed) throws IOException, ServletException {

    }
}
