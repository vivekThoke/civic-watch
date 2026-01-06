package com.project.civicwatch.dto;

import com.project.civicwatch.model.IssueStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class StatusHistoryResponse {
    private IssueStatus status;
    private String remark;
    private LocalDateTime updatedAt;
}
