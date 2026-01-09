package com.project.civicwatch.service;

import com.project.civicwatch.dto.UpvoteResponse;
import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueUpvote;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.IssueRepository;
import com.project.civicwatch.repository.IssueUpvoteRepository;
import com.project.civicwatch.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Transactional
public class IssueUpvoteService {
    private final IssueRepository issueRepository;
    private final IssueUpvoteRepository issueUpvoteRepository;
    private final UserRepository userRepository;

    public UpvoteResponse upVote(Long id, String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not Found"));

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        if (issueUpvoteRepository.existsByUserAndIssue(user, issue)){
            throw new RuntimeException("User have already voted");
        }

        IssueUpvote upvote = IssueUpvote.builder()
                .user(user)
                .issue(issue)
                .build();

        issueUpvoteRepository.save(upvote);

        return buildResponse(issue, user);
    }

    public UpvoteResponse removeUpVote(Long id, String email){
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Issue issue = issueRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue not found"));

        IssueUpvote upvote = issueUpvoteRepository.findByUserAndIssue(user, issue)
                .orElseThrow(() -> new RuntimeException("Upvote not found"));

        issueUpvoteRepository.delete(upvote);

        return buildResponse(issue, user);
    }

    private UpvoteResponse buildResponse(Issue issue, User user){
        long count = issueUpvoteRepository.countByIssue(issue);

        boolean upVotedByMe = issueUpvoteRepository.existsByUserAndIssue(user, issue);

        return new UpvoteResponse(count, upVotedByMe);
    }
}
