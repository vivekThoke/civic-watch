package com.project.civicwatch.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpvoteResponse {
    private Long upvotes;
    private boolean upVotedByMe;
}
