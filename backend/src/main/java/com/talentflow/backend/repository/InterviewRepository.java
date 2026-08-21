package com.talentflow.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.talentflow.backend.model.Interview;

public interface InterviewRepository extends MongoRepository<Interview, String> {

    List<Interview> findByCandidateId(String candidateId);

    List<Interview> findByRecruiterId(String recruiterId);

    List<Interview> findByApplicationId(String applicationId);
}