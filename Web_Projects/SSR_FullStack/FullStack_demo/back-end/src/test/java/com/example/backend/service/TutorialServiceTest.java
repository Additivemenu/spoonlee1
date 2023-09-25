package com.example.backend.service;

import com.example.backend.dto.TutorialPostDto;
import com.example.backend.entity.Tutorial;
import com.example.backend.repository.TutorialRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

/**
 * @author xueshuo
 * @create 2023-03-07 5:56 am
 */
@ExtendWith(MockitoExtension.class)
class TutorialServiceTest {

    @Mock
    private TutorialRepository tutorialRepository;

    @InjectMocks
    private TutorialService tutorialService;        // what we want to test

    // mock data
    private final Tutorial mockTutorial = Tutorial.builder()
            .name("springboot tutorial1")
            .description("this is a springboot tutorial")
            .published(true)
            .build();

    private final TutorialPostDto mockTutorialPostDto = TutorialPostDto.builder()
            .name("springboot tutorial1")
            .description("this is a springboot tutorial")
            .published(true)
            .build();

    @Test
    void createTutorial() {

        tutorialService.createTutorial(mockTutorialPostDto);

        verify(tutorialRepository).save(mockTutorial);

    }
}