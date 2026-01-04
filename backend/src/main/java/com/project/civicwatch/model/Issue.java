package com.project.civicwatch.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 1000)
    private String description;

    private String locality;

    @Enumerated(EnumType.STRING)
    private IssueStatus status;

    private LocalDateTime createdAt;

    @ManyToOne
    private User reportedBy;

    @ManyToOne
    private IssueCategory category;

    private int upVote;

}
