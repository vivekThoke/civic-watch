package com.project.civicwatch.repository;

import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueUpvote;
import com.project.civicwatch.model.User;
import org.hibernate.dialect.lock.OptimisticEntityLockException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface IssueUpvoteRepository extends JpaRepository<IssueUpvote, Long> {
    boolean existsByUserAndIssue(User user, Issue issue);

    Optional<IssueUpvote> findByUserAndIssue(User user, Issue issue);

    long countByIssue(Issue issue);

    @Query("""
        SELECT CASE WHEN COUNT(iu) > 0 THEN true ELSE false END
        FROM IssueUpvote iu
        WHERE iu.issue.id = :issueId AND iu.user.id = :userId
    """)
    boolean hasUserUpvoted(Long issueId, Long userId);
}
