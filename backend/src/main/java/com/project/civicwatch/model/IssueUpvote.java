package com.project.civicwatch.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(
        name = "issue_upvotes",
        uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "issue_id"})
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class IssueUpvote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue;

    @CreationTimestamp
    private LocalDateTime createdAt;
}
