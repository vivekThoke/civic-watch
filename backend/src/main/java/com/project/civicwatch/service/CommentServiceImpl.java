package com.project.civicwatch.service;

import com.project.civicwatch.dto.CommentRequest;
import com.project.civicwatch.dto.CommentResponse;
import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.CommentRepository;
import com.project.civicwatch.repository.IssueRepository;
import com.project.civicwatch.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final IssueRepository issueRepository;
    private final UserRepository userRepository;



    @Override
    public CommentResponse addComment(Long issueId, String email, CommentRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        com.project.civicwatch.model.Comment.Comment comment = com.project.civicwatch.model.Comment.Comment.builder()
                .content(request.getContent())
                .user(user)
                .issue(issue)
                .build();

        com.project.civicwatch.model.Comment.Comment saved = commentRepository.save(comment);

        return  mapToCommentResponse(saved);

    }

    private CommentResponse mapToCommentResponse(com.project.civicwatch.model.Comment.Comment saved) {
        return CommentResponse.builder()
                .id(saved.getId())
                .content(saved.getContent())
                .author(saved.getUser().getEmail())
                .createdAt(saved.getCreatedAt())
                .build();
    }

    @Override
    public List<CommentResponse> getCommentByIssue(Long issueId) {
        return commentRepository.findByIssueIdOrderByCreatedAtDesc(issueId)
                .stream()
                .map(this::mapToCommentResponse)
                .toList();
    }
}
