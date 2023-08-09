package com.luv2code.shareddictionary.repository;

import com.luv2code.shareddictionary.entity.DictionaryEntry;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * @author xueshuo
 * @create 2023-08-09 10:08 am
 */
public interface DictionaryRepository extends JpaRepository<DictionaryEntry, Long> {
    Optional<DictionaryEntry> findByWord(String word);
}

