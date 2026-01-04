package com.project.civicwatch.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IssueResponse {
    private Long id;
    private String title;
    private String status;
}
