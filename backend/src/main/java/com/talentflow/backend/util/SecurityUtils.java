package com.talentflow.backend.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtils {

    private SecurityUtils() {
    }

    public static Authentication getAuthentication() {

        return SecurityContextHolder
                .getContext()
                .getAuthentication();
    }

    public static String getCurrentUserEmail() {

        Authentication authentication =
                getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return null;
        }

        return authentication.getName();
    }

    public static boolean isAuthenticated() {

        Authentication authentication =
                getAuthentication();

        return authentication != null &&
                authentication.isAuthenticated();
    }

    public static boolean hasRole(String role) {

        Authentication authentication =
                getAuthentication();

        if (authentication == null) {
            return false;
        }

        return authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority()
                                .equals("ROLE_" + role)
                );
    }

    public static boolean isCandidate() {
        return hasRole("CANDIDATE");
    }

    public static boolean isRecruiter() {
        return hasRole("RECRUITER");
    }
}