package com.Rupankar.BackendJavaERP.Staff;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface StaffRepo extends MongoRepository<StaffModel, String> {
}
