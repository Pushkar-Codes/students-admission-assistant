package com.Rupankar.BackendJavaERP.Student;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.stream.Collectors;

public class StudentService {
    @Autowired
    private StudentRepo studentRepo;

    // Method to get Name
    public List<String> getAllStudentNames() {
        return studentRepo.findAllFullNames().stream()
                .map(StudentRepo.FullNameOnly::getFullName)
                .toList();
    }

    // Method to get Email
    public List<String> getAllEmails() {
        return studentRepo.findAllEmails().stream()
                .map(StudentRepo.EmailOnly::getEmail)
                .collect(Collectors.toList());
    }

    // Method to get genders
    public List<String> getAllGenders() {
        return studentRepo.findAllGenders().stream()
                .map(StudentRepo.GenderOnly::getGender)
                .toList();
    }

    // Method to get school name
    public List<String> getAllSchoolNames() {
        return studentRepo.findAllSchoolNames().stream()
                .map(StudentRepo.SchoolNameOnly::getSchoolName)
                .toList();
    }

    //Method to get CurrentClass
    public List<String> getAllCurrentClasses() {
        return studentRepo.findAllCurrentClasses().stream()
                .map(StudentRepo.CurrentClassOnly::getCurrentClass)
                .toList();
    }

    //Method to get StudentPhoneNumber
    public List<String> getAllStudentPhoneNumber() {
        return studentRepo.findAllStudentPhoneNumber().stream()
                .map(StudentRepo.StudentPhoneNumberOnly::getStudentPhoneNumber)
                .toList();
    }

    //Method to get ParentPhoneNumber
    public List<String> getAllParentPhoneNumber() {
        return studentRepo.findAllParentPhoneNumber().stream()
                .map(StudentRepo.ParentPhoneNumberOnly::getParentPhoneNumber)
                .toList();
    }

    //Method to get Parent has Whatsapp
    public List<Boolean> getAllParentHasWhatsapp() {
        return studentRepo.findAllParentHasWhatsapp().stream()
                .map(StudentRepo.ParentHasWhatsappOnly::getParentHasWhatsapp)
                .toList();
    }

    //Method to get Student has Whatsapp
    public List<Boolean> getAllStudentHasWhatsapp() {
        return studentRepo.findAllStudentHasWhatsapp().stream()
                .map(StudentRepo.StudentHasWhatsappOnly::getStudentHasWhatsapp)
                .toList();
    }

}
