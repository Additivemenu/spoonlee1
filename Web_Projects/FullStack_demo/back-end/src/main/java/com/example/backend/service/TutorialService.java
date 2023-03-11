package com.example.backend.service;

import com.example.backend.dto.TutorialGetDto;
import com.example.backend.dto.TutorialPostDto;
import com.example.backend.entity.Tutorial;
import com.example.backend.repository.TutorialRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

/**
 * @author xueshuo
 * @create 2023-03-06 10:04 pm
 */
@Service
@RequiredArgsConstructor
public class TutorialService {

    private final TutorialRepository tutorialRepository;        // injection


    public TutorialGetDto createTutorial(TutorialPostDto tutorialPostDto){
        // System.out.println(tutorialPostDto);

        Tutorial tutorial = new Tutorial();
        tutorial.setName(tutorialPostDto.getName());
        tutorial.setDescription(tutorialPostDto.getDescription());
        tutorial.setPublished(tutorialPostDto.getPublished());

        // 将tutorial存进数据库table
        tutorialRepository.save(tutorial);      // argument必须是entity, not dto

        return TutorialGetDto.builder()
                .name(tutorialPostDto.getName())
                .description(tutorialPostDto.getDescription())
                .published(tutorialPostDto.getPublished())
                .build();
    }

}
