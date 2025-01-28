package com.hyperesume.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.hyperesume.model.User;
import com.hyperesume.mapper.UserMapper;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ProfileService profileService;


    public void saveUser(User user) {
        if (user.getRole() == null || user.getRole().isEmpty()) {
            user.setRole("ROLE_USER");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userMapper.saveUser(user);
    }

    public User findByUsername(String username) {
        User user = userMapper.findByUsername(username);
        if (user != null) {
            profileService.getProfileByUserId(user.getId()).ifPresent(user::setProfile);
        }
        return user;
    }

    public User findUserById(Long id) {
        User user = userMapper.findById(id);
        if (user != null) {
            profileService.getProfileByUserId(user.getId()).ifPresent(user::setProfile);
        }
        return user;
    }

    public void updateUser(User user) {
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        } else {
            User existingUser = userMapper.findById(user.getId());
            if (existingUser != null) {
                user.setPassword(existingUser.getPassword());
            }
        }
        userMapper.updateUser(user);
    }

    public void deleteUserById(Long id) {
        userMapper.deleteUserById(id);
    }

    public List<User> getAllUsers() {
        List<User> users = userMapper.findAllUsers();
        // For each user, fetch their profile and set it
        for (User user : users) {
            profileService.getProfileByUserId(user.getId()).ifPresent(user::setProfile);
        }
        return users;
    }
}
