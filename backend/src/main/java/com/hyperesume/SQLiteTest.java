package com.hyperesume;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class SQLiteTest {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:hyperesume.db";
        try (Connection conn = DriverManager.getConnection(url)) {
            if (conn != null) {
                System.out.println("Connection to SQLite has been established.");
            } else {
                System.out.println("Failed to establish connection.");
            }
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}
