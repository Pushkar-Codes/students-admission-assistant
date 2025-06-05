package com.Rupankar.BackendJavaERP.Staff;
import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/api_Staff")
@RestController
public class StaffController {
    @Autowired
    private StaffService staffService;

    // End point to get all data of all staff
    @GetMapping("/all_staff_data")
    public ResponseEntity<List<StaffModel>> getAllStaffExcludingId() {
        List<StaffModel> staffList = staffService.getAllStaffDataExcludingId();
        return ResponseEntity.ok(staffList);
    }

    // Endpoint to get all data of a particular attribute
    @GetMapping("/staff_attribute-values")
    public ResponseEntity<AttributePageResponse> getFieldValues(
            @RequestParam String field,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        AttributePageResponse response = staffService.getFieldValuesWithPaginationStaff(field, page, size);
        return ResponseEntity.ok(response);
    }

    // Endpoint to get staff field by a particular attribute
    @GetMapping("/staff_field_attribute")
    public List<String> getFieldByAttribute(
            @RequestParam String attribute,
            @RequestParam String value,
            @RequestParam String returnField) {

        return staffService.getFieldByAttributeStaff(attribute, value, returnField);
    }

}
