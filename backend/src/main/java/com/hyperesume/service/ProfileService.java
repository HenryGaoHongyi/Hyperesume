package com.hyperesume.service;

import com.hyperesume.model.Profile;
import com.hyperesume.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Fetch profile by userId
    public Optional<Profile> getProfileByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }

    // Save profile
    public void saveProfile(Profile profile) {
        profileRepository.save(profile);
    }
}