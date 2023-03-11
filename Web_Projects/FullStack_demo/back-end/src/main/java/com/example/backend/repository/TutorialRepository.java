package com.example.backend.repository;

import com.example.backend.entity.Tutorial;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author xueshuo
 * @create 2023-03-06 10:05 pm
 */
public interface TutorialRepository extends JpaRepository<Tutorial, Long> {
}

