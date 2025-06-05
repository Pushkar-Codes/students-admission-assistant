package com.Rupankar.BackendJavaERP.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api_Staff")
@RestController
public class StaffController {
    @Autowired
    private StaffService staffService;

    @GetMapping("/all")
    public ResponseEntity<List<StaffModel>> getAllStaffExcludingId() {
        List<StaffModel> staffList = staffService.getAllStaffDataExcludingId();
        return ResponseEntity.ok(staffList);
    }
}
