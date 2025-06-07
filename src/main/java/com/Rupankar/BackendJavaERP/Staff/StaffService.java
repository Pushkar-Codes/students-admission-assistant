package com.Rupankar.BackendJavaERP.Staff;
import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import com.Rupankar.BackendJavaERP.Student.StudentModel;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.result.UpdateResult;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class StaffService {

    private final MongoTemplate mongoTemplate;

    @Autowired
    public StaffService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // Method to get all data of all staff
    public List<StaffModel> getAllStaffDataExcludingId() {
        Query query = new Query();
        query.fields().exclude("_id");  // Exclude _id from MongoDB result

        return mongoTemplate.find(query, StaffModel.class, "users");
    }

    // Method to get all data of an attribute
    public AttributePageResponse getFieldValuesWithPaginationStaff(String fieldName, int page, int size) {
        Query query = new Query().with(PageRequest.of(page, size));
        query.fields().include(fieldName).exclude("_id");

        long total = mongoTemplate.count(new Query(), "users");
        List<Document> docs = mongoTemplate.find(query, Document.class, "users");

        List<String> values = docs.stream()
                .map(doc -> {
                    Object val = doc.get(fieldName);
                    return val != null ? val.toString() : null;
                })
                .filter(Objects::nonNull)
                .toList();

        int totalPages = (int) Math.ceil((double) total / size);

        return new AttributePageResponse(values, page, size, total, totalPages);
    }

    // Method to get field by a particular attribute
    public List<String> getFieldByAttributeStaff(String attribute, String value, String returnField) {
        Query query = new Query(Criteria.where(attribute).is(value));
        if (!returnField.equals("_id")) {
            query.fields().include(returnField).exclude("_id");
        } else {
            query.fields().include("_id");
        }

        List<Document> results = mongoTemplate.find(query, Document.class, "users");

        return results.stream()
                .map(doc -> {
                    if (returnField.equals("_id")) {
                        return doc.getObjectId("_id").toHexString(); // convert ObjectId to String
                    } else {
                        Object val = doc.get(returnField);
                        return val != null ? val.toString() : null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();
    }

    // Method to edit field of a staff by attribute
    public String editFieldByAttributeStaff(String filter_attribute, String filter_value,
                                            String update_field, String new_value){

        Query query = new Query(Criteria.where(filter_attribute).is(filter_value));
        Update update = new Update().set(update_field, new_value);

        UpdateResult updateResult = mongoTemplate.updateFirst(query,update,"users");

        if(updateResult.getMatchedCount() == 0){
            return "no match found";
        } else if (updateResult.getModifiedCount() == 0) {
            return "Document found, but nothing was updated (maybe same value).";
        }
        else {
            return "update success";
        }
    }

    // Method to delete field of a staff by attribute
    public String deleteFieldByAttributeStaff(String filter_attribute, String filter_value){

        Query query = new Query(Criteria.where(filter_attribute).is(filter_value));

        DeleteResult deleteResult = mongoTemplate.remove(query, "users");

        if (deleteResult.getDeletedCount() == 0){
            return "no match fund";
        }
        else {
            return deleteResult.getDeletedCount() + " documents deleted";
        }
    }

    // Method to assign staff.
    public String assignedStaff(String filter_attribute, String filter_value, String staff_name){

        Query query = new Query(Criteria.where(filter_attribute).is(filter_value));
        Update update = new Update().set("assignedStaff",staff_name);

        UpdateResult updateResult = mongoTemplate.updateFirst(query, update, "studentregisters");

        if (updateResult.getMatchedCount() == 0){
            return "no match found";
        } else if (updateResult.getModifiedCount() == 0) {
            return "Document found, but nothing was updated (maybe same value).";
        }
        else {
          return   "staff assign success";
        }
    }

    // Method to get student data by a staff name.
    public List<StudentModel> studentData(String staff_name){

        Query query = new Query(Criteria.where("assignedStaff").is(staff_name));
        query.fields().exclude("_id");

        return mongoTemplate.find(query, StudentModel.class, "studentregisters");

    }

}
