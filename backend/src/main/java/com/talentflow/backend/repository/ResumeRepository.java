package com.talentflow.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.talentflow.backend.model.Resume;

public interface ResumeRepository extends MongoRepository<Resume, String> {

    List<Resume> findByCandidateId(String candidateId);
}