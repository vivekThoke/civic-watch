package com.project.civicwatch.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.civicwatch.dto.IssueCreateRequest;
import com.project.civicwatch.dto.IssueResponse;
import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.UserRepository;
import com.project.civicwatch.service.IssueService;
import jdk.jfr.ContentType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public IssueResponse createIssue(@RequestPart(value = "data") String data,
                                     @RequestPart(value = "images", required = false) List<MultipartFile> images,
                                     Principal principal) throws JsonProcessingException {
        IssueCreateRequest request = objectMapper.readValue(data, IssueCreateRequest.class);

        User user = userRepository.findByEmail(principal.getName()).orElseThrow();

        Issue issue = issueService.createIssue(request, user);

        return new IssueResponse(issue.getId(), issue.getTitle(), issue.getStatus().name());

    }
}
