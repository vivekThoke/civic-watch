package com.project.civicwatch.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data

public class CommentRequest {
    @NotBlank
    private String content;
}


