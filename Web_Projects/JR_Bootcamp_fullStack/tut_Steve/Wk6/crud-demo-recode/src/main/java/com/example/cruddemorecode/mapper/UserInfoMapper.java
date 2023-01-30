package com.example.cruddemorecode.mapper;

import com.example.cruddemorecode.dto.UserGetDto;
import com.example.cruddemorecode.dto.UserPostDto;
import com.example.cruddemorecode.entity.User;
import org.mapstruct.Mapper;

/**
 * @author xueshuo
 * @create 2023-01-28 4:31 pm
 */
@Mapper(componentModel = "spring")  // 自动去匹配输入和返回的对象的相同名称的field, 方法名不重要 (字段如果名称不同也可以做, 只需加额外的annotaion 见mapstruct官网)
public interface UserInfoMapper {
    UserGetDto mapUserToUserGetDto(User user);

    User mapUserPostDtoToUser(UserPostDto userPostDto);
}
