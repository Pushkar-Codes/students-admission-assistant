package com.Rupankar.BackendJavaERP.Staff;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffService {


    private final MongoTemplate mongoTemplate;
    @Autowired
    public StaffService(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    public List<StaffModel> getAllStaffDataExcludingId() {
        Query query = new Query();
        query.fields().exclude("_id");  // Exclude _id from MongoDB result

        return mongoTemplate.find(query, StaffModel.class, "users"); // Adjust collection name if needed
    }
}
