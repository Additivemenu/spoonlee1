package com.example.cruddemo.service;

import com.example.cruddemo.dto.UserPostDto;
import com.example.cruddemo.entity.User;
import com.example.cruddemo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author xueshuo
 * @create 2023-01-13 9:24 pm
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public void createUser(UserPostDto userPostDto){        // store info from service to database
        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setName(userPostDto.getName());
        user.setPassword(userPostDto.getPassword());
        userRepository.save(user);
        //userRepository.delete();
    }
}
