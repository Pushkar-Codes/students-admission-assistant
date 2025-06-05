package com.Rupankar.BackendJavaERP.Staff;

import org.springframework.data.annotation.Id;

public class StaffModel {
    @Id
    private String _id; // Will be null since we exclude _id

    private String name;
    private String email;
    private String password;
    private String role;
}
