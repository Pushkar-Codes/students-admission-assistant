package com.Rupankar.BackendJavaERP.Staff;
import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import com.Rupankar.BackendJavaERP.Student.StudentModel;
import com.Rupankar.BackendJavaERP.Student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    // Endpoint to edit field of a staff by attribute
    @PutMapping("/edit_field_by_attribute_staff")
    public String editFieldByAttributeStaff(
            @RequestParam String filter_attribute,
            @RequestParam String filter_value,
            @RequestParam String update_field,
            @RequestParam String new_value
    ){
        return staffService.editFieldByAttributeStaff(filter_attribute, filter_value, update_field, new_value);
    }

    // Endpoint to delete a field of a staff by attribute
    @DeleteMapping("delete_field_by_attribute_staff")
    public String deleteFieldByAttributeStaff(
            @RequestParam String filter_attribute,
            @RequestParam String filter_value
    ){
        return staffService.deleteFieldByAttributeStaff(filter_attribute, filter_value);
    }

    // Endpoint to assign staff.
    @PutMapping("/assign_staff")
    public String assign_staff(
            @RequestParam String filter_attribute,
            @RequestParam String filter_value,
            @RequestParam String staff_name
    ){
        return staffService.assignedStaff(filter_attribute,filter_value,staff_name);
    }

    // Endpoint to get all data of a student where staff = given by client.
    @GetMapping("/assign_staff_student_data")
    public ResponseEntity<List<StudentModel>> studentDataAssignedStaff(
            @RequestParam String staff_name
    ){
        List<StudentModel> student_list = staffService.studentData(staff_name);
        return ResponseEntity.ok(student_list);
    }

}
