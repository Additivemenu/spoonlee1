package com.example.cruddemorecode.repository;

import com.example.cruddemorecode.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * repository里
 * @author xueshuo
 * @create 2023-01-25 12:19 pm
 */

// <User, Long>:
//      |--- User对应User entity, 而User entity对应User table, 表示我们是要对User table进行增删改查的
//      |--- Long是User的pk类型
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
