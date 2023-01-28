package com.example.cruddemorecode.mapper;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import org.springframework.stereotype.Component;

/**
 * @author xueshuo
 * @create 2023-01-28 9:43 am
 */

@Component
public class UserMapper {
    public UserGetDto mapUserToUserGetDto(User user){
        // 方式1
//        UserGetDto userGetDto = new UserGetDto();
//
//        userGetDto.setId(user.getId());
//        userGetDto.setName(user.getName());
//        userGetDto.setEmail(user.getEmail());
//        userGetDto.setCreatedTime(user.getCreatedTime());
//        userGetDto.setUpdatedTime(user.getUpdatedTime());

        // 方式2: 通过builder来写
        UserGetDto userGetDto = UserGetDto.builder()
                .createdTime(user.getCreatedTime())
                .id(user.getId())
                .email(user.getEmail())
                .updatedTime(user.getUpdatedTime())
                .name(user.getName())
                .build();

        return userGetDto;
    }

    public User mapUserPostDtoToUser(UserPostDto userPostDto){

//        // 方式1
//        User user = new User();
//
//        user.setEmail(userPostDto.getEmail());
//        user.setName(userPostDto.getName());
//        user.setPassword(userPostDto.getPassword());

        // 方式2
        User user = User.builder()
                .email(userPostDto.getEmail())
                .name(userPostDto.getName())
                .password(userPostDto.getPassword())
                .build();


        return user;
    }


}
