package com.hyperesume.service;

import com.hyperesume.model.Certification;
import com.hyperesume.model.User;
import com.hyperesume.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CertificationService {

    @Autowired
    private CertificationRepository certificationRepository;

    @Autowired
    private UserService userService;

    public List<Certification> findByLoggedInUser() {
        Long userId = getLoggedInUserId();

        return certificationRepository.findByUser_Id(userId);
    }

    public Certification save(Certification certification) {
        Long userId = getLoggedInUserId();
        certification.setUserId(userId);
        return certificationRepository.save(certification);
    }

    private Long getLoggedInUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        User user = userService.findByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found for username: " + username);
        }

        return user.getId();
    }

    public Certification update(Long id, Certification certification) {
        Certification existingCertification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));
        existingCertification.setName(certification.getName());
        existingCertification.setDate(certification.getDate());
        return certificationRepository.save(existingCertification);
    }

    public void delete(Long id) {
        Certification existingCertification = certificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found"));
        certificationRepository.delete(existingCertification);
    }
}
