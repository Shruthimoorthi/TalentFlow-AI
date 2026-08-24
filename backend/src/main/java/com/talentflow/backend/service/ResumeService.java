package com.talentflow.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.talentflow.backend.model.Resume;
import com.talentflow.backend.repository.ResumeRepository;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.util.List;
import java.util.Map;

@Service
public class ResumeService {

        private final ResumeRepository resumeRepository;
        private final Cloudinary cloudinary;

        public ResumeService(
                        ResumeRepository resumeRepository,
                        Cloudinary cloudinary) {

                this.resumeRepository = resumeRepository;
                this.cloudinary = cloudinary;
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
                                !originalFileName.toLowerCase().endsWith(".pdf")) {

                        throw new RuntimeException(
                                        "Only PDF resumes are allowed");
                }

                try {

                        String publicId = buildPublicId(candidateId, originalFileName);

                        Map<?, ?> uploadResult = cloudinary.uploader().upload(
                                        file.getBytes(),
                                        ObjectUtils.asMap(
                                                        "resource_type", "image",
                                                        "folder", "talentflow/resumes",
                                                        "public_id", publicId,
                                                        "use_filename", false,
                                                        "unique_filename", false,
                                                        "overwrite", true));

                        Object secureUrl = uploadResult.get("secure_url");

                        if (secureUrl == null) {
                                throw new RuntimeException(
                                                "Cloudinary upload did not return a secure URL");
                        }

                        Resume resume = new Resume();

                        resume.setCandidateId(candidateId);
                        resume.setFileName(originalFileName);
                        resume.setFileUrl(secureUrl.toString());
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
                                        "Failed to upload resume to Cloudinary",
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
                                                "Resume not found with id: " + id));
        }

        // ==================== GET BY CANDIDATE ====================

        public List<Resume> getResumesByCandidate(
                        String candidateId) {

                return resumeRepository.findByCandidateId(candidateId);
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

                if (resume.getFileUrl() != null &&
                                !resume.getFileUrl().isBlank()) {

                        try {

                                String publicId = extractPublicId(resume.getFileUrl());

                                if (publicId != null &&
                                                !publicId.isBlank()) {

                                        cloudinary.uploader().destroy(
                                                        publicId,
                                                        ObjectUtils.asMap(
                                                                        "resource_type", "raw"));
                                }

                        } catch (Exception e) {

                                throw new RuntimeException(
                                                "Failed to delete resume from Cloudinary",
                                                e);
                        }
                }

                resumeRepository.deleteById(id);
        }

        // ==================== HELPERS ====================

        private String buildPublicId(
                        String candidateId,
                        String originalFileName) {

                String cleanFileName = originalFileName
                                .replaceAll(
                                                "[^a-zA-Z0-9._-]",
                                                "_");

                /*
                 * Keep .pdf in the public ID because this is a raw PDF asset.
                 */
                return candidateId + "_" + cleanFileName;
        }

        public byte[] downloadResumeFile(Resume resume) {

                if (resume == null ||
                                resume.getFileUrl() == null ||
                                resume.getFileUrl().isBlank()) {

                        throw new RuntimeException(
                                        "Resume file is not available");
                }

                try {

                        URL url = new URL(resume.getFileUrl());

                        java.net.HttpURLConnection connection = (java.net.HttpURLConnection) url.openConnection();

                        connection.setRequestMethod("GET");
                        connection.setConnectTimeout(15000);
                        connection.setReadTimeout(30000);

                        int responseCode = connection.getResponseCode();

                        if (responseCode < 200 ||
                                        responseCode >= 300) {

                                throw new RuntimeException(
                                                "Cloudinary returned HTTP " +
                                                                responseCode);
                        }

                        try (
                                        java.io.InputStream inputStream = connection.getInputStream();

                                        java.io.ByteArrayOutputStream outputStream = new java.io.ByteArrayOutputStream()) {

                                byte[] buffer = new byte[8192];

                                int bytesRead;

                                while ((bytesRead = inputStream.read(buffer)) != -1) {

                                        outputStream.write(
                                                        buffer,
                                                        0,
                                                        bytesRead);
                                }

                                return outputStream.toByteArray();

                        } finally {

                                connection.disconnect();
                        }

                } catch (Exception e) {

                        throw new RuntimeException(
                                        "Failed to download resume file",
                                        e);
                }
        }

        private String extractPublicId(
                        String fileUrl) {

                try {

                        URL url = new URL(fileUrl);

                        String path = url.getPath();

                        String marker = "/upload/";

                        int markerIndex = path.indexOf(marker);

                        if (markerIndex == -1) {
                                return null;
                        }

                        String publicPath = path.substring(
                                        markerIndex + marker.length());

                        /*
                         * Remove Cloudinary version segment such as:
                         * v1756041234/
                         */
                        if (publicPath.startsWith("v")) {

                                int slashIndex = publicPath.indexOf('/');

                                if (slashIndex != -1) {

                                        publicPath = publicPath.substring(
                                                        slashIndex + 1);
                                }
                        }

                        /*
                         * Remove the file extension because
                         * Cloudinary destroy() expects the public ID.
                         */
                        int extensionIndex = publicPath.lastIndexOf('.');

                        if (extensionIndex != -1) {

                                publicPath = publicPath.substring(
                                                0,
                                                extensionIndex);
                        }

                        return publicPath;

                } catch (Exception e) {

                        return null;
                }
        }
}