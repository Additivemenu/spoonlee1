package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPatchDto;
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


    // 增
    public void createUser(UserPostDto userPostDto){
        System.out.println(userPostDto);

        User user = new User();
        user.setEmail(userPostDto.getEmail());
        user.setName(userPostDto.getName());
        user.setPassword(userPostDto.getPassword());

        // 将user存进table
        userRepository.save(user);      // argument必须是entity, not dto
    }


    // 查
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


    // 删
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


    // 改
    public UserGetDto updateUser(UserPatchDto userPatchDto, Long userId) {
        // step1
        Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互

        User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        // step2
        user.setName(userPatchDto.getName());

        // step3
        userRepository.save(user);

        // step4: 将update过后的user entity转化为UserGetDto返回给前台
        UserGetDto userGetDto = new UserGetDto();
        userGetDto.setId(userId);
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }

    public UserGetDto getUserByEmail(String email) {
        // step1
        Optional<User> optionalUser = userRepository.findByEmail(email);      // repository的方法, 和数据库交互

        User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + email));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        // step2: entity --> dto
        UserGetDto userGetDto = new UserGetDto();
        userGetDto.setId(user.getId());
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }
}
