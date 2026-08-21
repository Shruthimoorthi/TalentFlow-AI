package com.talentflow.backend.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.talentflow.backend.model.Job;

public interface JobRepository extends MongoRepository<Job, String> {

    List<Job> findByRecruiterId(String recruiterId);

    List<Job> findByStatus(String status);
}