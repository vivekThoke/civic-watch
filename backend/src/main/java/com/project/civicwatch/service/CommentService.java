package com.project.civicwatch.service;

import com.project.civicwatch.dto.CommentRequest;
import com.project.civicwatch.dto.CommentResponse;

import java.util.List;

public interface CommentService {
    CommentResponse addComment(Long issueId, String email, CommentRequest request);

    List<CommentResponse> getCommentByIssue(Long issueId);

}
