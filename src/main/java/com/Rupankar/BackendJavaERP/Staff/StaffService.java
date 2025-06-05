package com.Rupankar.BackendJavaERP.Staff;
import com.Rupankar.BackendJavaERP.Student.DTO.AttributePageResponse;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
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
        Query query = new Query();
        query.addCriteria(Criteria.where(attribute).is(value));
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


}
