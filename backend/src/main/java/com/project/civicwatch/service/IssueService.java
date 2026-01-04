package com.project.civicwatch.service;

import com.project.civicwatch.dto.IssueCreateRequest;
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
}
