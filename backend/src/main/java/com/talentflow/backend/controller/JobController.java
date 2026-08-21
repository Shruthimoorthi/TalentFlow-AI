package com.talentflow.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentflow.backend.dto.job.CreateJobRequest;
import com.talentflow.backend.dto.job.JobResponse;
import com.talentflow.backend.dto.job.UpdateJobRequest;
import com.talentflow.backend.model.Job;
import com.talentflow.backend.service.JobService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @PostMapping
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody CreateJobRequest request) {

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setEmploymentType(request.getEmploymentType());
        job.setRecruiterId(request.getRecruiterId());

        Job savedJob = jobService.createJob(job);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(savedJob));
    }

    @GetMapping
    public ResponseEntity<List<JobResponse>> getAllJobs() {

        List<JobResponse> jobs = jobService.getAllJobs()
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/open")
    public ResponseEntity<List<JobResponse>> getOpenJobs() {

        List<JobResponse> jobs = jobService.getOpenJobs()
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{id}")
    public ResponseEntity<JobResponse> getJobById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                toResponse(jobService.getJobById(id)));
    }

    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<JobResponse>> getJobsByRecruiter(
            @PathVariable String recruiterId) {

        List<JobResponse> jobs = jobService.getJobsByRecruiter(recruiterId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(jobs);
    }

    @PutMapping("/{id}")
    public ResponseEntity<JobResponse> updateJob(
            @PathVariable String id,
            @Valid @RequestBody UpdateJobRequest request) {

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setEmploymentType(request.getEmploymentType());
        job.setStatus(request.getStatus());

        Job updatedJob = jobService.updateJob(id, job);

        return ResponseEntity.ok(
                toResponse(updatedJob));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteJob(
            @PathVariable String id) {

        jobService.deleteJob(id);

        return ResponseEntity.noContent().build();
    }

    private JobResponse toResponse(Job job) {

        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getLocation(),
                job.getEmploymentType(),
                job.getRecruiterId(),
                job.getStatus(),
                job.getCreatedAt());
    }
}