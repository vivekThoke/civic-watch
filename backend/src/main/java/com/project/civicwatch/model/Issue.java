package com.project.civicwatch.model;

import com.project.civicwatch.dto.StatusHistoryResponse;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

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

    @OneToMany(mappedBy = "issue", fetch = FetchType.LAZY)
    private List<IssueImage> images;

    @OneToMany(mappedBy = "issue", fetch = FetchType.LAZY)
    private List<IssueStatusHistory> statusHistory;

}
