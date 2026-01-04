package com.project.civicwatch.dto;

import lombok.Data;

@Data
public class IssueCreateRequest {
    private String title;
    private String description;
    private String locality;
    private Long categoryId;
}
