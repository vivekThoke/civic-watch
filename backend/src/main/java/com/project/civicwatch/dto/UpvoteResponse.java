package com.project.civicwatch.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpvoteResponse {
    private Long id;
    private boolean upVotedByMe;
}
