package com.hyperesume.mapper;

import com.hyperesume.model.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

// Ensure @Mapper annotation is present to be scanned
@Mapper
public interface UserMapper {

    // Insert a new user into the database
    @Insert("INSERT INTO users (username, password, role) VALUES (#{username}, #{password}, COALESCE(#{role}, 'ROLE_USER'))")
    @Options(useGeneratedKeys=true, keyProperty="id")
    void saveUser(User user);

    // Retrieve a user by their ID
    @Select("SELECT * FROM users WHERE id = #{id}")
    User findById(@Param("id") Long id);

    // Retrieve a user by their username
    @Select("SELECT * FROM users WHERE username = #{username}")
    User findByUsername(@Param("username") String username);

    // Retrieve a user and their roles by username (linked to XML configuration)
    User findByUsernameWithRoles(@Param("username") String username);

    // Retrieve all users
    @Select("SELECT * FROM users")
    List<User> findAllUsers();

    // Update a user's information
    @Update("UPDATE users SET username = #{username}, password = #{password}, role = #{role} WHERE id = #{id}")
    void updateUser(User user);

    // Delete a user by ID
    @Delete("DELETE FROM users WHERE id = #{id}")
    void deleteUserById(@Param("id") Long id);

}