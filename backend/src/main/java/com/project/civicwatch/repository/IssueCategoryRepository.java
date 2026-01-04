package com.project.civicwatch.repository;

import com.project.civicwatch.model.IssueCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface IssueCategoryRepository extends JpaRepository<IssueCategory, Long> {
    Optional<IssueCategory> findByName(String name);
}
