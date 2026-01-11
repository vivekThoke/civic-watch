package com.project.civicwatch.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<com.project.civicwatch.model.Comment.Comment, Long> {
    List<com.project.civicwatch.model.Comment.Comment> findByIssueIdOrderByCreatedAtDesc(Long issueId);
}

