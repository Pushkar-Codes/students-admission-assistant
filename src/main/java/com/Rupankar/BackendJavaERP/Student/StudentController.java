package com.Rupankar.BackendJavaERP.Student;

import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api_Student")
@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Endpoint to get all values of any attribute
    @GetMapping("/attribute_values")
    public AttributePageResponse getFieldValuesWithPagination(
            @RequestParam String field,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return studentService.getFieldValuesWithPagination(field, page, size);
    }

    @GetMapping("/all_student_data")
    public ResponseEntity<List<Document>> getAllStudentsExcludingId() {
        List<Document> students = studentService.getAllStudentDataExcludingId();
        return ResponseEntity.ok(students);
    }

    // Endpoint to get name by attribute
//    @GetMapping("/name_by_attribute")
//    public List<String> getStudentNamesByAttribute(
//            @RequestParam String attribute,
//            @RequestParam String value
//    ) {
//        return studentService.getStudentNamesByAttribute(attribute, value);
//    }

    // Endpoint to get all Email
//    @GetMapping("/emails")
//    public List<String> getAllEmails() {
//        return studentService.getAllEmails();
//    }

    // Endpoint to get Email by attribute
//    @GetMapping("/email_by_attribute")
//    public List<String> getStudentEmailsByAttribute(
//            @RequestParam String attribute,
//            @RequestParam String value
//    ) {
//        return studentService.getStudentEmailsByAttribute(attribute, value);
//    }

    // Endpoint to get all genders
//    @GetMapping("/genders")
//    public List<String> getGenders() {
//        return studentService.getAllGenders();
//    }

    // Endpoint to get gender by attribute
//    @GetMapping("/gender_by_attribute")
//    public List<String> getStudentGendersByAttribute(
//            @RequestParam String attribute,
//            @RequestParam String value
//    ) {
//        return studentService.getStudentGendersByAttribute(attribute, value);
//    }


    // Endpoint to get all school name
//    @GetMapping("/schools")
//    public List<String> getSchoolNames() {
//        return studentService.getAllSchoolNames();
//    }

    // Endpoint to get school name by attribute
//    @GetMapping("/school_by_attribute")
//    public List<String> getStudentSchoolnamesByAttribute(
//            @RequestParam String attribute,
//            @RequestParam String value
//    ) {
//        return studentService.getStudentSchoolnamesByAttribute(attribute, value);
//    }


    //Endpoint to get all current class
//    @GetMapping("/classes")
//    public List<String> getCurrentClasses() {
//        return studentService.getAllCurrentClasses();
//    }
//
//    // Endpoint to get current class by attribute
//    @GetMapping("/currentclass_by_attribute")
//    public List<String> getCurrentclassByAttribute(
//            @RequestParam String attribute,
//            @RequestParam String value
//    ) {
//        return studentService.getCurrentclassByAttribute(attribute, value);
//    }

    //Endpoint to get Student phone number
//    @GetMapping("/StudentPhoneNumber")
//    public List<String> getStudentPhoneNumber() {
//        return studentService.getAllStudentPhoneNumber();
//    }

    //Endpoint to get all Parent phone number
//    @GetMapping("/ParentPhoneNumber")
//    public List<String> getParentPhoneNumber() {
//        return studentService.getAllParentPhoneNumber();
//    }

    // Endpoint to get all parent-has-whatsapp
//    @GetMapping("/parent-has-whatsapp")
//    public List<Boolean> getParentHasWhatsapp() {
//        return studentService.getAllParentHasWhatsapp();
//    }

    // Endpoint to get all student-has-whatsapp
//    @GetMapping("/student-has-whatsapp")
//    public List<Boolean> getStudentHasWhatsapp() {
//        return studentService.getAllStudentHasWhatsapp();
//    }

    // Endpoint to get field by a particular attribute
    @GetMapping("/field_by_attribute")
    public List<String> getFieldByAttribute(
            @RequestParam String attribute,
            @RequestParam String value,
            @RequestParam String field
    ) {
        return studentService.getFieldByAttribute(attribute, value, field);
    }

    // Endpoint To edit a field by attribute
    @PutMapping("/edit_field")
    public String editFieldByAttribute(
            @RequestParam String filterAttr,
            @RequestParam String filterValue,
            @RequestParam String updateField,
            @RequestParam String newValue
    ) {
        return studentService.editFieldByAttribute(filterAttr, filterValue, updateField, newValue);
    }

    // Endpoint to delete a student details by attribute
    @DeleteMapping("/delete_field")
    public String deleteByField(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.deleteByField(attribute, value);
    }

}