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

import com.talentflow.backend.dto.interview.CreateInterviewRequest;
import com.talentflow.backend.dto.interview.InterviewResponse;
import com.talentflow.backend.model.Interview;
import com.talentflow.backend.service.InterviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/interviews")
public class InterviewController {

    private final InterviewService interviewService;

    public InterviewController(InterviewService interviewService) {
        this.interviewService = interviewService;
    }

    @PostMapping
    public ResponseEntity<InterviewResponse> createInterview(
            @Valid @RequestBody CreateInterviewRequest request) {

        Interview interview = new Interview();

        interview.setApplicationId(request.getApplicationId());
        interview.setRecruiterId(request.getRecruiterId());
        interview.setCandidateId(request.getCandidateId());
        interview.setScheduledAt(request.getScheduledAt());
        interview.setMeetingLink(request.getMeetingLink());

        Interview savedInterview = interviewService.createInterview(interview);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(toResponse(savedInterview));
    }

    @GetMapping
    public ResponseEntity<List<InterviewResponse>> getAllInterviews() {

        List<InterviewResponse> interviews = interviewService.getAllInterviews()
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(interviews);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InterviewResponse> getInterviewById(
            @PathVariable String id) {

        return ResponseEntity.ok(
                toResponse(
                        interviewService.getInterviewById(id)));
    }

    @GetMapping("/candidate/{candidateId}")
    public ResponseEntity<List<InterviewResponse>> getInterviewsByCandidate(
            @PathVariable String candidateId) {

        List<InterviewResponse> interviews = interviewService
                .getInterviewsByCandidate(candidateId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(interviews);
    }

    @GetMapping("/recruiter/{recruiterId}")
    public ResponseEntity<List<InterviewResponse>> getInterviewsByRecruiter(
            @PathVariable String recruiterId) {

        List<InterviewResponse> interviews = interviewService
                .getInterviewsByRecruiter(recruiterId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(interviews);
    }

    @GetMapping("/application/{applicationId}")
    public ResponseEntity<List<InterviewResponse>> getInterviewsByApplication(
            @PathVariable String applicationId) {

        List<InterviewResponse> interviews = interviewService
                .getInterviewsByApplication(applicationId)
                .stream()
                .map(this::toResponse)
                .toList();

        return ResponseEntity.ok(interviews);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InterviewResponse> updateInterview(
            @PathVariable String id,
            @RequestBody Interview interview) {

        Interview updatedInterview = interviewService.updateInterview(id, interview);

        return ResponseEntity.ok(
                toResponse(updatedInterview));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInterview(
            @PathVariable String id) {

        interviewService.deleteInterview(id);

        return ResponseEntity.noContent().build();
    }

    private InterviewResponse toResponse(Interview interview) {

        return new InterviewResponse(
                interview.getId(),
                interview.getApplicationId(),
                interview.getRecruiterId(),
                interview.getCandidateId(),
                interview.getScheduledAt(),
                interview.getMeetingLink(),
                interview.getStatus(),
                interview.getNotes());
    }
}