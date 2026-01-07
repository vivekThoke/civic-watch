package com.project.civicwatch.controller;

import com.project.civicwatch.dto.IssueCategoryResponse;
import com.project.civicwatch.model.IssueCategory;
import com.project.civicwatch.repository.IssueCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/categories")
public class CategoriesController {
    private final IssueCategoryRepository issueCategoryRepository;

    @GetMapping
    public List<IssueCategoryResponse> getCategories(){
        return issueCategoryRepository.findAll()
                .stream()
                .map(this::mapToCategoryResponse)
                .toList();

    }

    private IssueCategoryResponse mapToCategoryResponse(IssueCategory issueCategory) {
        return IssueCategoryResponse.builder()
                .id(issueCategory.getId())
                .name(issueCategory.getName())
                .build();
    }
}
