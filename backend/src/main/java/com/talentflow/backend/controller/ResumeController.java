package com.talentflow.backend.controller;

import java.util.List;

import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.talentflow.backend.dto.resume.ResumeResponse;
import com.talentflow.backend.model.Resume;
import com.talentflow.backend.service.ResumeService;

@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

        private final ResumeService resumeService;

        public ResumeController(ResumeService resumeService) {
                this.resumeService = resumeService;
        }

        // ==================== CREATE ====================

        @PostMapping(consumes = "multipart/form-data", produces = "application/json")
        public ResponseEntity<ResumeResponse> createResume(

                        @RequestParam("candidateId") String candidateId,

                        @RequestParam("file") MultipartFile file,

                        @RequestParam(value = "summary", required = false) String summary,

                        @RequestParam(value = "skills", required = false) String skills) {

                Resume savedResume = resumeService.createResume(
                                candidateId,
                                file,
                                summary,
                                skills);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(toResponse(savedResume));
        }

        // ==================== GET ALL ====================

        @GetMapping
        public ResponseEntity<List<ResumeResponse>> getAllResumes() {

                List<ResumeResponse> resumes = resumeService.getAllResumes()
                                .stream()
                                .map(this::toResponse)
                                .toList();

                return ResponseEntity.ok(resumes);
        }

        // ==================== VIEW PDF ====================

        @GetMapping("/{id}/file")
        public ResponseEntity<Resource> getResumeFile(
                        @PathVariable String id) {

                Resume resume = resumeService.getResumeById(id);

                byte[] fileBytes = resumeService.downloadResumeFile(resume);

                ByteArrayResource resource = new ByteArrayResource(fileBytes);

                return ResponseEntity.ok()
                                .contentType(MediaType.APPLICATION_PDF)
                                .header(
                                                HttpHeaders.CONTENT_DISPOSITION,
                                                "inline; filename=\"" +
                                                                resume.getFileName() +
                                                                "\"")
                                .contentLength(fileBytes.length)
                                .body(resource);
        }

        // ==================== GET BY ID ====================

        @GetMapping("/{id}")
        public ResponseEntity<ResumeResponse> getResumeById(
                        @PathVariable String id) {

                return ResponseEntity.ok(
                                toResponse(
                                                resumeService.getResumeById(id)));
        }

        // ==================== GET BY CANDIDATE ====================

        @GetMapping("/candidate/{candidateId}")
        public ResponseEntity<List<ResumeResponse>> getResumesByCandidate(
                        @PathVariable String candidateId) {

                List<ResumeResponse> resumes = resumeService
                                .getResumesByCandidate(candidateId)
                                .stream()
                                .map(this::toResponse)
                                .toList();

                return ResponseEntity.ok(resumes);
        }

        // ==================== UPDATE ====================

        @PutMapping("/{id}")
        public ResponseEntity<ResumeResponse> updateResume(
                        @PathVariable String id,
                        @RequestBody Resume resume) {

                Resume updatedResume = resumeService.updateResume(id, resume);

                return ResponseEntity.ok(
                                toResponse(updatedResume));
        }

        // ==================== DELETE ====================

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteResume(
                        @PathVariable String id) {

                resumeService.deleteResume(id);

                return ResponseEntity.noContent().build();
        }

        // ==================== RESPONSE ====================

        private ResumeResponse toResponse(Resume resume) {

                return new ResumeResponse(
                                resume.getId(),
                                resume.getCandidateId(),
                                resume.getFileName(),
                                resume.getFileUrl(),
                                resume.getSummary(),
                                resume.getSkills(),
                                resume.getUploadedAt());
        }
}