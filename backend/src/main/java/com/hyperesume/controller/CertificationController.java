package com.hyperesume.controller;

import com.hyperesume.model.Certification;
import com.hyperesume.service.CertificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/certifications")
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @GetMapping("/get")
    public List<Certification> getCertifications() {
        return certificationService.findByLoggedInUser();
    }

    @PostMapping("/create")
    public Certification createCertification(@RequestBody Certification certification) {
        return certificationService.save(certification);
    }

    @PutMapping("/edit/{id}")
    public Certification editCertification(@PathVariable Long id, @RequestBody Certification certification) {
        return certificationService.update(id, certification);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCertification(@PathVariable Long id) {
        certificationService.delete(id);
    }
}
