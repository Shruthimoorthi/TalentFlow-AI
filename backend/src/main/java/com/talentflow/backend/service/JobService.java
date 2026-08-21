package com.talentflow.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.talentflow.backend.model.Job;
import com.talentflow.backend.repository.JobRepository;

@Service
public class JobService {

    private final JobRepository jobRepository;

    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public Job createJob(Job job) {
        if (job.getStatus() == null || job.getStatus().isBlank()) {
            job.setStatus("OPEN");
        }

        return jobRepository.save(job);
    }

    public List<Job> getAllJobs() {
        return jobRepository.findAll();
    }

    public List<Job> getOpenJobs() {
        return jobRepository.findByStatus("OPEN");
    }

    public Job getJobById(String id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found with id: " + id));
    }

    public List<Job> getJobsByRecruiter(String recruiterId) {
        return jobRepository.findByRecruiterId(recruiterId);
    }

    public Job updateJob(String id, Job updatedJob) {

        Job existingJob = getJobById(id);

        existingJob.setTitle(updatedJob.getTitle());
        existingJob.setDescription(updatedJob.getDescription());
        existingJob.setLocation(updatedJob.getLocation());
        existingJob.setEmploymentType(updatedJob.getEmploymentType());

        if (updatedJob.getStatus() != null) {
            existingJob.setStatus(updatedJob.getStatus());
        }

        return jobRepository.save(existingJob);
    }

    public void deleteJob(String id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job not found with id: " + id);
        }

        jobRepository.deleteById(id);
    }
}