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

        UserGetDto userGetDto = new UserGetDto();

        userGetDto.setId(user.getId());
        userGetDto.setName(user.getName());
        userGetDto.setEmail(user.getEmail());
        userGetDto.setCreatedTime(user.getCreatedTime());
        userGetDto.setUpdatedTime(user.getUpdatedTime());

        return userGetDto;
    }

    public User mapUserPostDtoToUser(UserPostDto userPostDto){

        User user = new User();

        user.setEmail(userPostDto.getEmail());
        user.setName(userPostDto.getName());
        user.setPassword(userPostDto.getPassword());

        return user;
    }


}
