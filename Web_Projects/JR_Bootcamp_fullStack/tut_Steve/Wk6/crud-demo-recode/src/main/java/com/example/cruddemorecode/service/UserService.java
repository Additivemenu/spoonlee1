package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPatchDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import com.example.cruddemorecode.exception.ResourceNotFoundException;
import com.example.cruddemorecode.mapper.UserInfoMapper;
import com.example.cruddemorecode.mapper.UserMapper;
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
    // private final UserMapper userMapper;         // 自己写的UserMapper
    private final UserInfoMapper userMapper;        // 通过@Mapper自动创建的

    // 增
    public void createUser(UserPostDto userPostDto){
        System.out.println(userPostDto);

        User user = userMapper.mapUserPostDtoToUser(userPostDto);

        // 将user存进table
        userRepository.save(user);      // argument必须是entity, not dto
    }


    // 查
    public UserGetDto getUser(Long userId) {

        User user = findUser(userId);

        System.out.println(user);

        return userMapper.mapUserToUserGetDto(user);
    }


    // 删
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }


    // 改
    public UserGetDto updateUser(UserPatchDto userPatchDto, Long userId) {
        // step1
        User user = findUser(userId);

        // step2
        user.setName(userPatchDto.getName());

        // step3
        userRepository.save(user);

        // step4: 将update过后的user entity转化为UserGetDto返回给前台
        return userMapper.mapUserToUserGetDto(user);
    }

    public UserGetDto getUserByEmail(String email) {
        // step1
        User user = userRepository.findByEmail(email).orElseThrow(() -> new ResourceNotFoundException("User " + email));     // Optional类的方法
        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.

        // step2: entity --> dto, then return to front end
        return userMapper.mapUserToUserGetDto(user);
    }



    // helper function: try to find user in database
    // not private because other table might also want to find user when joining tables
    public User findUser(Long userId){
//        Optional<User> optionalUser = userRepository.findById(userId);      // repository的方法, 和数据库交互
//        User user = optionalUser.orElseThrow(() -> new ResourceNotFoundException("User " + userId));     // Optional类的方法
//        // T orElseThrow(Supplier<? extends X> exceptionSupplier): 如果有值则将其返回, 否则抛出由Supplier interface实现提供的异常.
//        return user;

        // 三行写作一行
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User " + userId));
    }
}
