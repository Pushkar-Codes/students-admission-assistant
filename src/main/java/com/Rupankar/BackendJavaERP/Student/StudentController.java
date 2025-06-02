package com.Rupankar.BackendJavaERP.Student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    // Endpoint to get Email
    @GetMapping("/emails")
    public List<String> getAllEmails() {
        return studentService.getAllEmails();
    }

    // Endpoint to get genders
    @GetMapping("/genders")
    public List<String> getGenders() {
        return studentService.getAllGenders();
    }

    // Endpoint to get school name
    @GetMapping("/schools")
    public List<String> getSchoolNames() {
        return studentService.getAllSchoolNames();
    }

    //Endpoint to get current class
    @GetMapping("/classes")
    public List<String> getCurrentClasses() {
        return studentService.getAllCurrentClasses();
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

}
