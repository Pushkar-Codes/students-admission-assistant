package com.Rupankar.BackendJavaERP.Student;

import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.bson.Document;
import java.util.List;
import java.util.Objects;

@Service
public class StudentService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public StudentService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // Method to get name by Attribute
//    public List<String> getStudentNamesByAttribute(String attribute, String value) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where(attribute).is(value));
//        query.fields().include("name").exclude("_id");
//
//        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");
//
//        return results.stream()
//                .map(doc -> doc.getString("name"))
//                .toList();
//    }

    // Method to get all values of any attribute with pagination.
    public AttributePageResponse getFieldValuesWithPagination(String field, int page, int size) {

        Query query = new Query().with(PageRequest.of(page, size));
        if (!field.equals("_id")) {
            query.fields().include(field).exclude("_id");
        }
        else {
            query.fields().include("_id");
        }

        long total = mongoTemplate.count(new Query(), "studentregisters");
        var results = mongoTemplate.find(query, Document.class, "studentregisters");

        List<String> values = results.stream()
                .map(doc -> {
                    Object val = doc.get(field);
                    if(val instanceof org.bson.types.ObjectId objectId){
                        return objectId.toHexString();
                    }
                    else {
                        return val != null ? val.toString() : null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();
        return new AttributePageResponse(
                values,
                page,
                size,
                total,
                (int) Math.ceil((double) total/size)
        );
    }

    // get all data of students
    public List<Document> getAllStudentDataExcludingId() {
        Query query = new Query();
        query.fields().exclude("_id");  // Exclude _id from projection

        return mongoTemplate.find(query, Document.class, "studentregisters");
    }

    // Method to get Emails by attribute
//    public List<String> getStudentEmailsByAttribute(String attribute, String value) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where(attribute).is(value));
//        query.fields().include("email").exclude("_id");
//
//        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");
//
//        return results.stream()
//                .map(doc -> doc.getString("email"))
//                .toList();
//    }


    // Method to get Email
//    public List<String> getAllEmails() {
//        return studentRepo.findAllEmails().stream()
//                .map(StudentRepo.EmailOnly::getEmail)
//                .collect(Collectors.toList());
//    }

    // Method to get gender by attribute
//    public List<String> getStudentGendersByAttribute(String attribute, String value) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where(attribute).is(value));
//        query.fields().include("gender").exclude("_id");
//
//        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");
//
//        return results.stream()
//                .map(doc -> doc.getString("gender"))
//                .toList();
//    }


    // Method to get genders
//    public List<String> getAllGenders() {
//        return studentRepo.findAllGenders().stream()
//                .map(StudentRepo.GenderOnly::getGender)
//                .toList();
//    }

    // Method to get school name by attribute
//    public List<String> getStudentSchoolnamesByAttribute(String attribute, String value) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where(attribute).is(value));
//        query.fields().include("schoolname").exclude("_id");
//
//        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");
//
//        return results.stream()
//                .map(doc -> doc.getString("schoolname"))
//                .toList();
//    }


    // Method to get school name
//    public List<String> getAllSchoolNames() {
//        return studentRepo.findAllSchoolNames().stream()
//                .map(StudentRepo.SchoolNameOnly::getSchoolname)
//                .toList();
//    }

    // Method to get current class by attribute
//    public List<String> getCurrentclassByAttribute(String attribute, String value) {
//        Query query = new Query();
//        query.addCriteria(Criteria.where(attribute).is(value));
//        query.fields().include("currentclass").exclude("_id");
//
//        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");
//
//        return results.stream()
//                .map(doc -> doc.getString("currentclass"))
//                .toList();
//    }


    //Method to get CurrentClass
//    public List<String> getAllCurrentClasses() {
//        return studentRepo.findAllCurrentClasses().stream()
//                .map(StudentRepo.CurrentClassOnly::getCurrentclass)
//                .toList();
//    }

    // From here only one method is fetching requested data by attribute

    //Method to get StudentPhoneNumber
//    public List<String> getAllStudentPhoneNumber() {
//        return studentRepo.findAllStudentPhoneNumber().stream()
//                .map(StudentRepo.StudentPhoneNumberOnly::getPhone)
//                .toList();
//    }

    //Method to get ParentPhoneNumber
//    public List<String> getAllParentPhoneNumber() {
//        return studentRepo.findAllParentPhoneNumber().stream()
//                .map(StudentRepo.ParentPhoneNumberOnly::getParentphone)
//                .toList();
//    }

    //Method to get Parent has Whatsapp
//    public List<Boolean> getAllParentHasWhatsapp() {
//        return studentRepo.findAllParentHasWhatsapp().stream()
//                .map(StudentRepo.ParentHasWhatsappOnly::getParentwhatsapp)
//                .toList();
//    }

    //Method to get Student has Whatsapp
//    public List<Boolean> getAllStudentHasWhatsapp() {
//        return studentRepo.findAllStudentHasWhatsapp().stream()
//                .map(StudentRepo.StudentHasWhatsappOnly::getHavewhatsapp)
//                .toList();
//    }

    // Method to get field by attribute
    public List<String> getFieldByAttribute(String attribute, String value, String returnField) {
        Query query = new Query();
        query.addCriteria(Criteria.where(attribute).is(value));
        if (!returnField.equals("_id")) {
            query.fields().include(returnField).exclude("_id");
        } else {
            query.fields().include("_id");
        }

        List<Document> results = mongoTemplate.find(query, Document.class, "studentregisters");

        return results.stream()
                .map(doc -> {
                    if (returnField.equals("_id")) {
                        return doc.getObjectId("_id").toHexString(); // this prevents the cast error
                    } else {
                        return doc.getString(returnField);
                    }
                })
                .toList();
    }

    // Method to edit a student field by attribute
    public String editFieldByAttribute(String filterAttr, String filterValue, String updateField, String newValue) {
        Query query = new Query(Criteria.where(filterAttr).is(filterValue));
        Update update = new Update().set(updateField, newValue);

        UpdateResult result = mongoTemplate.updateFirst(query, update, "studentregisters");

        if (result.getMatchedCount() == 0) {
            return "No matching document found.";
        } else if (result.getModifiedCount() == 0) {
            return "Document found, but nothing was updated (maybe same value).";
        } else {
            return "Updated successfully.";
        }
    }

    // Method to delete a student details by attribute
    public String deleteByField(String attribute, String value) {
        Query query = new Query(Criteria.where(attribute).is(value));

        DeleteResult result = mongoTemplate.remove(query, "studentregisters");

        if (result.getDeletedCount() == 0) {
            return "No matching document found to delete.";
        } else {
            return result.getDeletedCount() + " document(s) deleted.";
        }
    }

}
