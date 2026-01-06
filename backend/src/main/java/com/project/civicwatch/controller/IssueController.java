package com.project.civicwatch.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.civicwatch.dto.IssueCreateRequest;
import com.project.civicwatch.dto.IssueDetailResponse;
import com.project.civicwatch.dto.IssueResponse;
import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueStatus;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.UserRepository;
import com.project.civicwatch.service.IssueFeedService;
import com.project.civicwatch.service.IssueService;
import jdk.jfr.ContentType;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@RequiredArgsConstructor
public class IssueController {
    private final IssueService issueService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;
    private final IssueFeedService issueFeedService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IssueResponse createIssue(@RequestPart(value = "data") String data,
                                     @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                     Principal principal) throws JsonProcessingException {
        IssueCreateRequest request = objectMapper.readValue(data, IssueCreateRequest.class);

        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        Issue issue = issueService.createIssue(request, user);

        return new IssueResponse(issue.getId(),
                issue.getTitle(),
                issue.getStatus().name(), issue.getLocality(),
                issue.getCategory().getName(),
                issue.getCreatedAt(),
                issue.getDescription());

    }

    @GetMapping("/{id}")
    public ResponseEntity<IssueDetailResponse> getIssueById(@PathVariable Long id){
        return ResponseEntity.ok(issueService.getIssueById(id));
    }

    @GetMapping("/public")
    public Page<IssueResponse> getPublicIssue(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) IssueStatus status,
            @RequestParam(required = false) String locality,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt,desc") String sort
            ){
        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sort.split(",")[0]).descending()
        );

        Page<Issue> issues = issueFeedService.getPublicFeed(categoryId, status, locality, pageable);

        return issues.map(IssueResponse::from);


    }
}
