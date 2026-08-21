package com.talentflow.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.talentflow.backend.model.Application;

public interface ApplicationRepository extends MongoRepository<Application, String> {

    List<Application> findByCandidateId(String candidateId);

    List<Application> findByJobId(String jobId);

    boolean existsByJobIdAndCandidateId(String jobId, String candidateId);
}