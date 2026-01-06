package com.project.civicwatch.service;

import com.project.civicwatch.dto.ImageResponse;
import com.project.civicwatch.dto.IssueCreateRequest;
import com.project.civicwatch.dto.IssueDetailResponse;
import com.project.civicwatch.dto.StatusHistoryResponse;
import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueCategory;
import com.project.civicwatch.model.IssueStatus;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.IssueCategoryRepository;
import com.project.civicwatch.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class IssueService {
    private final IssueRepository issueRepository;
    private final IssueCategoryRepository issueCategoryRepository;

    public Issue createIssue (IssueCreateRequest request, User user){
        IssueCategory category = issueCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Invalid Category"));

        Issue issue = Issue.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .locality(request.getLocality())
                .category(category)
                .status(IssueStatus.REPORTED)
                .createdAt(LocalDateTime.now())
                .reportedBy(user)
                .build();

        return issueRepository.save(issue);
    }

    public IssueDetailResponse getIssueById(Long id){
        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));
        return mapToDetailResponse(issue);
    }

    private IssueDetailResponse mapToDetailResponse(Issue issue) {
        return IssueDetailResponse.builder()
                .id(issue.getId())
                .title(issue.getTitle())
                .description(issue.getDescription())
                .category(issue.getCategory().getName())
                .status(issue.getStatus())
                .locality(issue.getLocality())
                .upvotes(issue.getUpVote())
                .createdAt(issue.getCreatedAt())
                .images(issue.getImages().stream()
                        .map(img -> new ImageResponse(img.getId(), img.getImgUrl())).toList())
                .statusHistory(issue.getStatusHistory().stream()
                        .map(history -> new StatusHistoryResponse(
                                history.getStatus(),
                                history.getRemark(),
                                history.getUpdatedAt()
                        )).toList())
                .build();

    }
}
