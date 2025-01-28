package com.hyperesume.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hyperesume.model.Experience;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    List<Experience> findByUser_Id(Long userId);
}