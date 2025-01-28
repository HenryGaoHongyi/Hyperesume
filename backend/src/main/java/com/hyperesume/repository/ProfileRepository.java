package com.hyperesume.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.hyperesume.model.Profile;
import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByUserId(Long userId);
}