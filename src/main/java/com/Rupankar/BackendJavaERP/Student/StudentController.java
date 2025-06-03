package com.Rupankar.BackendJavaERP.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api_Student")
@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Endpoint to get Name
    @GetMapping("/names")
    public List<String> getAllStudentNames() {
        return studentService.getAllStudentNames();
    }

    // Endpoint to get name by attribute
    @GetMapping("/name_by_attribute")
    public List<String> getStudentNamesByAttribute(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.getStudentNamesByAttribute(attribute, value);
    }

    // Endpoint to get Email
    @GetMapping("/emails")
    public List<String> getAllEmails() {
        return studentService.getAllEmails();
    }

    // Endpoint to get Email by attribute
    @GetMapping("/email_by_attribute")
    public List<String> getStudentEmailsByAttribute(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.getStudentEmailsByAttribute(attribute, value);
    }

    // Endpoint to get genders
    @GetMapping("/genders")
    public List<String> getGenders() {
        return studentService.getAllGenders();
    }

    // Endpoint to get gender by attribute
    @GetMapping("/gender_by_attribute")
    public List<String> getStudentGendersByAttribute(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.getStudentGendersByAttribute(attribute, value);
    }


    // Endpoint to get school name
    @GetMapping("/schools")
    public List<String> getSchoolNames() {
        return studentService.getAllSchoolNames();
    }

    // Endpoint to get school name by attribute
    @GetMapping("/school_by_attribute")
    public List<String> getStudentSchoolnamesByAttribute(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.getStudentSchoolnamesByAttribute(attribute, value);
    }


    //Endpoint to get current class
    @GetMapping("/classes")
    public List<String> getCurrentClasses() {
        return studentService.getAllCurrentClasses();
    }

    // Endpoint to get current class by attribute
    @GetMapping("/currentclass_by_attribute")
    public List<String> getCurrentclassByAttribute(
            @RequestParam String attribute,
            @RequestParam String value
    ) {
        return studentService.getCurrentclassByAttribute(attribute, value);
    }

    //Endpoint to get Student phone number
    @GetMapping("/StudentPhoneNumber")
    public List<String> getStudentPhoneNumber() {
        return studentService.getAllStudentPhoneNumber();
    }

    //Endpoint to get Parent phone number
    @GetMapping("/ParentPhoneNumber")
    public List<String> getParentPhoneNumber() {
        return studentService.getAllParentPhoneNumber();
    }

    // Endpoint to get parent-has-whatsapp
    @GetMapping("/parent-has-whatsapp")
    public List<Boolean> getParentHasWhatsapp() {
        return studentService.getAllParentHasWhatsapp();
    }

    // Endpoint to get student-has-whatsapp
    @GetMapping("/student-has-whatsapp")
    public List<Boolean> getStudentHasWhatsapp() {
        return studentService.getAllStudentHasWhatsapp();
    }

    // Endpoint to get field by attribute
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