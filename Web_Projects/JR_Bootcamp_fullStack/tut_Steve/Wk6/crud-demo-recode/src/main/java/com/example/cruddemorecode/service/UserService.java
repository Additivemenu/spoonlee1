package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

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


    public UserGetDto getUser(Long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互

        // User user = optionalUser.get();      // 不够健壮, 如果指定id的user在数据库中不存在呢?

        User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        System.out.println(user);

        UserGetDto userGetDto = new UserGetDto();
        userGetDto.setId(userId);
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }


}
