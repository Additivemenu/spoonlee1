package com.example.cruddemorecode.service;

import com.example.cruddemorecode.entity.UserInfo;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

/**
 * @author xueshuo
 * @create 2023-02-25 11:37 am
 */
@Service
@RequiredArgsConstructor
public class ApplicationUserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        // 从数据库中查询指定email的User entity
        UserInfo userInfo = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User"+ email));

        // User是UserDetails的实现类
        return new User(email, userInfo.getPassword(), Collections.emptyList());    // 第三个arg, Authority目前没用， 先只写个empyList
    }
}
