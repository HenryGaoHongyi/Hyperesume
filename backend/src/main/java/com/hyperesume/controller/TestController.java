package com.hyperesume.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/api/test")
    public String test(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // false means don’t create a new session
        return (session == null)
                ? "No session"
                : "Session exists: " + session.getId();
    }
}
