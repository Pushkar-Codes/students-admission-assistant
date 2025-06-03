package com.Rupankar.BackendJavaERP;

import com.Rupankar.BackendJavaERP.Student.StudentModel;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;

import static org.assertj.core.api.Assertions.assertThatNoException;

@SpringBootTest
class BackendJavaErpApplicationTests {

//	@Autowired
//	private MongoTemplate mongoTemplate;
//	@Test
//	void testConnection(){
//		assertThatNoException().isThrownBy(() ->{
//		mongoTemplate.findAll(StudentModel.class);
//		});
//
//		System.out.println("success");
//	}
}
