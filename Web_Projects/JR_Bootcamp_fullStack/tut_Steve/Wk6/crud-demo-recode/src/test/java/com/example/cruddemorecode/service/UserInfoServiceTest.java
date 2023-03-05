package com.example.cruddemorecode.service;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.UserInfo;
import com.example.cruddemorecode.mapper.PropertyMapper;
import com.example.cruddemorecode.mapper.UserInfoMapper;
import com.example.cruddemorecode.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.OffsetDateTime;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

/**
 * @author xueshuo
 * @create 2023-01-28 8:53 pm
 */

//@ExtendWith(MockitoExtension.class)
//public class UserInfoServiceTest {
//    // UserService里的依赖其他类的方法不会测试 -- 如何理解???
//    // 而是用mock结果替换运行时的那行调用其他类的代码
//
//    // 如何方法没有返回值, 用verify()
//    // 如果方法有返回值, 用assertEquals()
//
//    @Mock
//    private UserRepository userRepository;
//
//    @Mock
//    private UserInfoMapper userMapper;        // 通过@Mapper自动创建的
//    @Mock
//    private  PropertyMapper propertyMapper;
//
//    @InjectMocks
//    private UserService userService;
//
//
//    // some mock results
//    private UserPostDto userPostDto = UserPostDto.builder()
//            .email("s1@gmail.com")
//            .name("s")
//            .password("password")
//            .build();
//
//    private final UserInfo userInfo = UserInfo.builder()
//            .email("s1@gmail.com")
//            .name("s")
//            .password("password")
//            .build();
//
//    private final UserGetDto mockUserGetDto = UserGetDto.builder()
//            .email("s@gmail.com")
//            .name("s")
//            .updatedTime(OffsetDateTime.now())
//            .createdTime(OffsetDateTime.now())
//            .build();
//
//    // test methods ------------------------------------
////    @Test
////    void shouldSaveNewUserRepoWhenCreateUser(){ // 测试方法名要有可读性
////        when(userMapper.mapUserPostDtoToUser(userPostDto).thenReturn(user));
////
////        userService.createUser(userPostDto);
////
////        verify(userRepository).save(user);
////    }
//
//
//    @Test
//    void shouldGetUserDtoWhenGetUser() {
//        Long userId = 1L;
//        when(userRepository.findById(userId)).thenReturn(Optional.of(userInfo));
//        when(userMapper.mapUserToUserGetDto(userInfo)).thenReturn(mockUserGetDto);
//
//        UserGetDto userGetDto = userService.getUser(userId);
//
//        assertEquals(userGetDto, mockUserGetDto);
//    }
//
//    @Test
//    void shouldDeleteUser(){
//        Long userId = 1L;
//
//        userService.deleteUser(userId);
//
//        verify(userRepository).deleteById(userId);
//
//    }
//
//
//
//}
