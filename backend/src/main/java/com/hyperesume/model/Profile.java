package com.hyperesume.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "First name is mandatory")
    @Column(nullable = false)
    private String firstName;

    @NotBlank(message = "Last name is mandatory")
    @Column(nullable = false)
    private String lastName;

    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is mandatory")
    @Column(nullable = false)
    private String email;

    private String phone;

    // Instead of a ManyToOne relationship, store userId directly as a foreign key.
    @Column(name = "user_id", nullable = false)
    private Long userId;

    // Default constructor
    public Profile() {}

    // Parameterized constructor
    public Profile(String firstName, String lastName, String email, String phone, Long userId) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.userId = userId;
    }

    // Getter and Setter methods for all fields

    public Long getId() {
        return id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}