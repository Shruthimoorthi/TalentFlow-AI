package com.talentflow.backend.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.talentflow.backend.service.AiMatchingService;

@RestController
@RequestMapping("/api/ai")
public class AiMatchingController {

    private final AiMatchingService aiMatchingService;

    public AiMatchingController(AiMatchingService aiMatchingService) {
        this.aiMatchingService = aiMatchingService;
    }

    // ==================== ANALYZE RESUME ====================

    @PostMapping("/analyze-resume/{resumeId}")
    public ResponseEntity<Map<String, Object>> analyzeResume(
            @PathVariable String resumeId) {

        return ResponseEntity.ok(
                aiMatchingService.analyzeResume(resumeId)
        );
    }

    // ==================== MATCH RESUME TO JOB ====================

    @PostMapping("/match-resume/{resumeId}/{jobId}")
    public ResponseEntity<Map<String, Object>> matchResumeToJob(
            @PathVariable String resumeId,
            @PathVariable String jobId) {

        return ResponseEntity.ok(
                aiMatchingService.matchResumeToJob(
                        resumeId,
                        jobId
                )
        );
    }
}