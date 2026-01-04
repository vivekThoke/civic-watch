package com.project.civicwatch.repository;

import com.project.civicwatch.model.IssueImage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IssueImageRepository extends JpaRepository<IssueImage, Long> {
}
