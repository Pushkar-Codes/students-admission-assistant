package com.Rupankar.BackendJavaERP.Student;

public class StudentModel {
    public String fullName;
    public String email;
    public String gender;
    public String schoolName;
    public String currentClass;
    public String studentPhoneNumber;
    public Boolean studentHasWhatsapp;
    public String parentPhoneNumber;
    public Boolean parentHasWhatsapp;

    // Getter start from here

    public String getCurrentClass() {
        return currentClass;
    }

    public String getEmail() {
        return email;
    }

    public String getFullName() {
        return fullName;
    }

    public String getGender() {
        return gender;
    }

    public Boolean getStudentHasWhatsapp() {
        return studentHasWhatsapp;
    }

    public Boolean getParentHasWhatsapp() {
        return parentHasWhatsapp;
    }

    public String getParentPhoneNumber() {
        return parentPhoneNumber;
    }

    public String getSchoolName() {
        return schoolName;
    }

    public String getStudentPhoneNumber() {
        return studentPhoneNumber;
    }

    // Setter start from here

    public void setCurrentClass(String currentClass) {
        this.currentClass = currentClass;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public void setStudentHasWhatsapp(Boolean studentHasWhatsapp) {
        this.studentHasWhatsapp = studentHasWhatsapp;
    }

    public void setParentHasWhatsapp(Boolean parentHasWhatsapp) {
        this.parentHasWhatsapp = parentHasWhatsapp;
    }

    public void setParentPhoneNumber(String parentPhoneNumber) {
        this.parentPhoneNumber = parentPhoneNumber;
    }

    public void setSchoolName(String schoolName) {
        this.schoolName = schoolName;
    }

    public void setStudentPhoneNumber(String studentPhoneNumber) {
        this.studentPhoneNumber = studentPhoneNumber;
    }
}
