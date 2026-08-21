package com.talentflow.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentflow.backend.dto.application.ApplicationResponse;
import com.talentflow.backend.dto.application.ApplyJobRequest;
import com.talentflow.backend.dto.application.UpdateApplicationStatusRequest;
import com.talentflow.backend.model.Application;
import com.talentflow.backend.service.ApplicationService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @PostMapping
    public ResponseEntity<ApplicationResponse> applyForJob(
            @Valid @RequestBody ApplyJobRequest request) {

        Application application = new Application();

        application.setJobId(request.getJobId());
        application.setCandidateId(request.getCandidateId());
        application.setResumeId(request.getResumeId());

        Application savedApplication = applicationService.applyForJob(application);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(savedApplication));
    }

    @GetMapping
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {

        List<ApplicationResponse> applications = applicationService.getAllApplications()
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApplicationResponse> getApplicationById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                toResponse(
                        applicationService.getApplicationById(id)));
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByCandidate(
            @PathVariable String candidateId) {

        List<ApplicationResponse> applications = applicationService
                .getApplicationsByCandidate(candidateId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(applications);
    }

    @GetMapping("/job/{jobId}")
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByJob(
            @PathVariable String jobId) {

        List<ApplicationResponse> applications = applicationService
                .getApplicationsByJob(jobId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(applications);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<ApplicationResponse> updateStatus(
            @PathVariable String id,
            @Valid @RequestBody UpdateApplicationStatusRequest request) {

        Application updatedApplication = applicationService.updateStatus(
                id,
                request.getStatus());

        return ResponseEntity.ok(
                toResponse(updatedApplication));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteApplication(
            @PathVariable String id) {

        applicationService.deleteApplication(id);

        return ResponseEntity.noContent().build();
    }

    private ApplicationResponse toResponse(
            Application application) {

        return new ApplicationResponse(
                application.getId(),
                application.getJobId(),
                application.getCandidateId(),
                application.getResumeId(),
                application.getStatus(),
                application.getAppliedAt());
    }
}