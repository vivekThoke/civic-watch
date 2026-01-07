package com.project.civicwatch.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class IssueCategoryResponse {
    private Long id;
    private String name;
}
