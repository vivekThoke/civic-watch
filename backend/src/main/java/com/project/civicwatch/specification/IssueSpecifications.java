package com.project.civicwatch.specification;

import com.project.civicwatch.model.Issue;
import com.project.civicwatch.model.IssueStatus;
import org.springframework.data.jpa.domain.Specification;

public class IssueSpecifications {
    public static Specification<Issue> hasCategory(Long categoryId){
        return ((root, query, criteriaBuilder) ->
                categoryId == null ? null : criteriaBuilder.equal(root.get("category").get("id"), categoryId));
    }

    public static Specification<Issue> hasStatus(IssueStatus status){
        return ((root, query, criteriaBuilder) ->
                status == null ? null :
                criteriaBuilder.equal(root.get("status"), status));
    }

    public static Specification<Issue> hasLocality(String locality){
        return ((root, query, criteriaBuilder) ->
                locality == null ? null :
                criteriaBuilder.like(criteriaBuilder.lower(root.get("locality")),
                        "%" + locality.toLowerCase() + "%") );
    }
}
