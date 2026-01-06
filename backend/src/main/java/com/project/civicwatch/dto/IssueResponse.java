package com.project.civicwatch.dto;

import com.project.civicwatch.model.Issue;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class IssueResponse {
    private Long id;
    private String title;
    private String status;
    private String locality;
    private String categoryName;
    private LocalDateTime createdAt;
    private String description;

    public IssueResponse() {

    }

    public static IssueResponse from(Issue issue) {
        IssueResponse response = new IssueResponse();
        response.id = issue.getId();
        response.title = issue.getTitle();
        response.status = issue.getStatus().name();
        response.locality = issue.getLocality();
        response.categoryName = issue.getCategory().getName();
        response.createdAt = issue.getCreatedAt();
        response.description = issue.getDescription();
        return response;
    }
}
