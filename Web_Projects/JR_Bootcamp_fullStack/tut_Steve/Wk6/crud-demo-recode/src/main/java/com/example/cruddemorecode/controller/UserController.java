package com.example.cruddemorecode.controller;

import com.example.cruddemorecode.dto.PropertyGetDto;
import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPatchDto;
import com.example.cruddemorecode.entity.Property;
import com.example.cruddemorecode.service.PropertyService;
import com.example.cruddemorecode.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import com.example.cruddemorecode.dto.UserPostDto;

import java.util.List;

/**
 * @author xueshuo
 * @create 2023-01-25 11:25 am
 */
@RestController
@RequestMapping("users")    // URL中跟着/api/v1的成分
@RequiredArgsConstructor    // for UserService
public class UserController {
    private final UserService userService;  // controller要调用service, 以传递数据 不要在controller调用repository

    private final PropertyService propertyService;

    // 接收URL作为输入， 然后进行一系列操作
    @PostMapping        // 接URL中/api/v1/users
    @ResponseStatus(HttpStatus.CREATED) // 创建成功的话, HttpStatus = 201
    public String createUser(@RequestBody UserPostDto userPostDto){
        System.out.println(userPostDto);
        userService.createUser(userPostDto);
        return "User create";
    }

    @GetMapping("/{userId}")     // 接URL中/api/v1/users
    public UserGetDto getUser(@PathVariable Long userId){
        UserGetDto userGetDto = userService.getUser(userId);
        return userGetDto;
    }

    @GetMapping
    public UserGetDto getUserByEmail(@RequestParam String email){
        System.out.println(email);
        return userService.getUserByEmail(email);
    }

    // http://localhost:8080/api/v1/users/{userId}/properties
    @GetMapping("/{userId}/properties")
    public List<PropertyGetDto> getPropertiesByUserId(@PathVariable Long userId){

//        // 方法一
//       return  propertyService.getPropertyByUserId(userId);

        // 方法二: 利用 User {List<Property>}
       return userService.getPropertiesByUserId(userId);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Long userId){
        userService.deleteUser(userId);
    }

    // @PutMapping 改动User全部属性
    // @PatchMapping 改动User部分属性
    @PatchMapping("/{userId}")
    public UserGetDto updateUser(@RequestBody UserPatchDto userPatchDto, @PathVariable Long userId){
        return userService.updateUser(userPatchDto, userId);
    }

}
