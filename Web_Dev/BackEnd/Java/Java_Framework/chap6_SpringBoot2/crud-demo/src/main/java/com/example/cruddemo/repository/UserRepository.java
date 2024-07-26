package com.example.cruddemo.repository;

import com.example.cruddemo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author xueshuo
 * @create 2023-01-13 9:21 pm
 */
public interface UserRepository extends JpaRepository<User, Long> {


}
