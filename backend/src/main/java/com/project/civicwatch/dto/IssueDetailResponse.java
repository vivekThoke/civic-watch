package com.project.civicwatch.dto;

import com.project.civicwatch.model.IssueStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class IssueDetailResponse {
    private Long id;
    private String title;
    private String description;
    private String category;
    private IssueStatus status;
    private String locality;
    private int upvotes;
    private LocalDateTime createdAt;
    private List<ImageResponse> images;
    private List<StatusHistoryResponse> statusHistory;
}
