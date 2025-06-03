package com.Rupankar.BackendJavaERP.Student;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "studentregisters")
public class StudentModel {
    public String name;
    public String email;
    public String gender;
    public String schoolname;
    public String currentclass;
    public String phone;
    public Boolean havewhatsapp;
    public String parentphone;
    public Boolean parentwhatsapp;

    // Getter start from here

//    public String getCurrentclass() {
//        return currentclass;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public String getGender() {
//        return gender;
//    }
//
//    public Boolean getHavewhatsapp() {
//        return havewhatsapp;
//    }
//
//    public Boolean getParentwhatsapp() {
//        return parentwhatsapp;
//    }
//
//    public String getParentphone() {
//        return parentphone;
//    }
//
//    public String getSchoolname() {
//        return schoolname;
//    }
//
//    public String getPhone() {
//        return phone;
//    }
//
//    // Setter start from here
//
//    public void setCurrentclass(String currentclass) {
//        this.currentclass = currentclass;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public void setGender(String gender) {
//        this.gender = gender;
//    }
//
//    public void setHavewhatsapp(Boolean havewhatsapp) {
//        this.havewhatsapp = havewhatsapp;
//    }
//
//    public void setParentwhatsapp(Boolean parentwhatsapp) {
//        this.parentwhatsapp = parentwhatsapp;
//    }
//
//    public void setParentphone(String parentphone) {
//        this.parentphone = parentphone;
//    }
//
//    public void setSchoolname(String schoolname) {
//        this.schoolname = schoolname;
//    }
//
//    public void setPhone(String phone) {
//        this.phone = phone;
//    }
}
