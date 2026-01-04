package com.project.civicwatch.service;

import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueStatus;
import com.project.civicwatch.repository.IssueRepository;
import com.project.civicwatch.specification.IssueSpecifications;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class IssueFeedService {
    private final IssueRepository issueRepository;

    public Page<Issue> getPublicFeed(
            Long categoryId,
            IssueStatus status,
            String locality,
            Pageable pageable){
        Specification<Issue> spec = Specification.allOf(
                IssueSpecifications.hasCategory(categoryId),
                IssueSpecifications.hasStatus(status),
                IssueSpecifications.hasLocality(locality)
        );

        return issueRepository.findAll(spec, pageable);
    }
}
