package com.hyperesume.service;

import com.hyperesume.mapper.PermissionMapper;
import com.hyperesume.mapper.UserMapper;
import com.hyperesume.model.SysMenu;
import com.hyperesume.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PermissionMapper permissionMapper;

    @Autowired
    private UserService userService;

//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//        User user = userMapper.findByUsername(username);
//        if (user == null) {
//            throw new UsernameNotFoundException("User not found: " + username);
//        }
//
//        // process permission by finding Sysmenu
//        List<SysMenu> permissions = permissionMapper.findByUserId(user.getId());
//
//        // make permission and role to GrantedAuthority
//        List<GrantedAuthority> authorities = new ArrayList<>();
//
//        // add role
//        if (user.getRole() != null && !user.getRole().isEmpty()) {
//            authorities.add(new SimpleGrantedAuthority(user.getRole()));
//        }
//
//        // add permission
//        authorities.addAll(permissions.stream()
//                .filter(p -> p != null && p.getMenuName() != null && !p.getMenuName().isEmpty())
//                .map(permission -> new SimpleGrantedAuthority("ROLE_" + permission.getMenuName()))
//                .collect(Collectors.toList()));
//
//        System.out.println("Loaded user: " + user.getUsername() + " with role: " + user.getRole());
//
//        return new org.springframework.security.core.userdetails.User(
//                user.getUsername(),
//                user.getPassword(),
//                authorities
//        );
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userService.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return user;
    }

}