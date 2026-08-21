package com.talentflow.backend.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.talentflow.backend.model.Resume;
import com.talentflow.backend.repository.ResumeRepository;

@Service
public class ResumeService {

    private final ResumeRepository resumeRepository;

    private final Path uploadDirectory = Paths.get("uploads/resumes");

    public ResumeService(ResumeRepository resumeRepository) {
        this.resumeRepository = resumeRepository;
    }

    // ==================== CREATE RESUME ====================

    public Resume createResume(
            String candidateId,
            MultipartFile file,
            String summary,
            String skills) {

        if (file == null || file.isEmpty()) {
            throw new RuntimeException("Resume file is required");
        }

        String originalFileName = file.getOriginalFilename();

        if (originalFileName == null ||
                !originalFileName
                        .toLowerCase()
                        .endsWith(".pdf")) {

            throw new RuntimeException(
                    "Only PDF resumes are allowed");
        }

        try {
            Files.createDirectories(uploadDirectory);

            String storedFileName = UUID.randomUUID()
                    + "_"
                    + originalFileName;

            Path filePath = uploadDirectory.resolve(storedFileName);

            Files.copy(
                    file.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING);

            Resume resume = new Resume();

            resume.setCandidateId(candidateId);
            resume.setFileName(originalFileName);

            resume.setFileUrl(
                    "/uploads/resumes/"
                            + storedFileName);

            resume.setSummary(summary);

            if (skills != null && !skills.isBlank()) {
                resume.setSkills(
                        List.of(skills.split(","))
                                .stream()
                                .map(String::trim)
                                .filter(skill -> !skill.isBlank())
                                .toList());
            }

            resume.setUploadedAt(
                    java.time.LocalDateTime.now());

            return resumeRepository.save(resume);

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to upload resume",
                    e);
        }
    }

    // ==================== GET ALL ====================

    public List<Resume> getAllResumes() {
        return resumeRepository.findAll();
    }

    // ==================== GET BY ID ====================

    public Resume getResumeById(String id) {

        return resumeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException(
                        "Resume not found with id: "
                                + id));
    }

    // ==================== GET BY CANDIDATE ====================

    public List<Resume> getResumesByCandidate(
            String candidateId) {

        return resumeRepository
                .findByCandidateId(candidateId);
    }

    // ==================== UPDATE ====================

    public Resume updateResume(
            String id,
            Resume updatedResume) {

        Resume existingResume = getResumeById(id);

        if (updatedResume.getFileName() != null) {
            existingResume.setFileName(
                    updatedResume.getFileName());
        }

        if (updatedResume.getSummary() != null) {
            existingResume.setSummary(
                    updatedResume.getSummary());
        }

        if (updatedResume.getSkills() != null) {
            existingResume.setSkills(
                    updatedResume.getSkills());
        }

        return resumeRepository.save(existingResume);
    }

    // ==================== DELETE ====================

    public void deleteResume(String id) {

        Resume resume = getResumeById(id);

        try {

            if (resume.getFileUrl() != null) {

                String fileName = Paths.get(
                        resume.getFileUrl())
                        .getFileName()
                        .toString();

                Path filePath = uploadDirectory
                        .resolve(fileName);

                Files.deleteIfExists(filePath);
            }

        } catch (IOException e) {

            throw new RuntimeException(
                    "Failed to delete resume file",
                    e);
        }

        resumeRepository.deleteById(id);
    }
}