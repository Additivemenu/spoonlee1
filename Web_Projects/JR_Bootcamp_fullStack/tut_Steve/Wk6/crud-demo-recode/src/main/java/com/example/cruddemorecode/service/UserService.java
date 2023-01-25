package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author xueshuo
 * @create 2023-01-25 12:29 pm
 */
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public void createUser(UserPostDto userPostDto){
        System.out.println(userPostDto);

        User user = new User();
        user.setEmail(userPostDto.getEmail());
        user.setName(userPostDto.getName());
        user.setPassword(userPostDto.getPassword());

        // 将user存进table
        userRepository.save(user);      // argument必须是entity, not dto
    }

}
