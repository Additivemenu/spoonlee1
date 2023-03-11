package com.example.backend.controller;

import com.example.backend.dto.TutorialGetDto;
import com.example.backend.dto.TutorialPostDto;
import com.example.backend.service.TutorialService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author xueshuo
 * @create 2023-03-06 10:04 pm
 */
@RestController
@RequestMapping("/tutorials")       // URL中跟着/api/v1的成分
@RequiredArgsConstructor
public class TutorialController {
    private final TutorialService tutorialService;      // injection

    @PostMapping
    public TutorialGetDto createUser(@RequestBody TutorialPostDto tutorialPostDto){
        System.out.println(tutorialPostDto);

       TutorialGetDto tutorialGetDto = tutorialService.createTutorial(tutorialPostDto);

        return tutorialGetDto;
    }

}
