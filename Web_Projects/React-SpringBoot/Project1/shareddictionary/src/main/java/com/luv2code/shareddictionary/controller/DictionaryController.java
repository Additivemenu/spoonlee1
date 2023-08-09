package com.luv2code.shareddictionary.controller;

import com.luv2code.shareddictionary.entity.DictionaryEntry;
import com.luv2code.shareddictionary.repository.DictionaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

/**
 * @author xueshuo
 * @create 2023-08-09 10:10 am
 */
@RestController
@RequestMapping("/api/dictionary")
public class DictionaryController {

    // ... other dependencies ...
    @Autowired
    private DictionaryRepository dictionaryRepository;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/{word}")
    public ResponseEntity<String> getMeaning(@PathVariable String word) {
        return dictionaryRepository.findByWord(word)
                .map(entry -> ResponseEntity.ok(entry.getMeaning()))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public DictionaryEntry addWord(@RequestBody DictionaryEntry entry) {
        dictionaryRepository.findByWord(entry.getWord()).ifPresent(existing -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Word already exists");
        });

        DictionaryEntry savedEntry = dictionaryRepository.save(entry);

        // Notify all subscribers about the new word
        messagingTemplate.convertAndSend("/topic/newword", savedEntry.getWord());

        return savedEntry;
    }
}

