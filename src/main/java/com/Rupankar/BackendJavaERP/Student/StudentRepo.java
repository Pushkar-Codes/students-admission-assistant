package com.Rupankar.BackendJavaERP.Student;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepo extends MongoRepository<StudentModel, String> {
//
//    // Fetch all name
//    @Query(value = "{}", fields = "{ 'name' : 1, '_id': 0 }")
//    Page<FullNameOnly> findAllFullNames(Pageable pageable);
//
//    // Fetch all emails
//    @Query(value = "{}", fields = "{ 'email' : 1, '_id' : 0 }")
//    List<EmailOnly> findAllEmails();
//
//    // Fetch all genders
//    @Query(value = "{}", fields = "{ 'gender' : 1, '_id' : 0 }")
//    List<GenderOnly> findAllGenders();
//
//    // Fetch all schoolName
//    @Query(value = "{}", fields = "{ 'schoolname' : 1, '_id' : 0 }")
//    List<SchoolNameOnly> findAllSchoolNames();
//
//    // Fetch all currentClass
//    @Query(value = "{}", fields = "{ 'currentclass' : 1, '_id' : 0 }")
//    List<CurrentClassOnly> findAllCurrentClasses();
//
//    // Fetch all student phone number
//    @Query(value = "{}", fields = "{ 'phone' : 1, '_id' : 0 }")
//    List<StudentPhoneNumberOnly> findAllStudentPhoneNumber();
//
//    // Fetch all parent phone number
//    @Query(value = "{}", fields = "{ 'parentphone' : 1, '_id' : 0 }")
//    List<ParentPhoneNumberOnly> findAllParentPhoneNumber();
//
//    // Fetch all parentHasWhatsapp
//    @Query(value = "{}", fields = "{ 'parentwhatsapp' : 1, '_id' : 0 }")
//    List<ParentHasWhatsappOnly> findAllParentHasWhatsapp();
//
//    // Fetch all studentHasWhatsapp
//    @Query(value = "{}", fields = "{ 'havewhatsapp' : 1, '_id' : 0 }")
//    List<StudentHasWhatsappOnly> findAllStudentHasWhatsapp();


//    // Name projection
//    interface FullNameOnly {
//        String getName();
//    }
//
//    // Emails projection
//    interface EmailOnly {
//        String getEmail();
//    }
//
//    // Gender projection
//    interface GenderOnly {
//        String getGender();
//    }
//
//    // SchoolName Projections
//    interface SchoolNameOnly {
//        String getSchoolname();
//    }
//
//    // Current Class projections
//    interface CurrentClassOnly {
//        String getCurrentclass();
//    }
//
//    // StudentPhoneNumber projections
//    interface StudentPhoneNumberOnly {
//        String getPhone();
//    }
//
//    // ParentPhoneNumber projections
//    interface ParentPhoneNumberOnly {
//        String getParentphone();
//    }
//
//    // Parent Has Whatsapp projections
//    interface ParentHasWhatsappOnly {
//        Boolean getParentwhatsapp();
//    }
//
//    // Student Has WhatsappOnly projection
//    interface StudentHasWhatsappOnly {
//        Boolean getHavewhatsapp();
//    }
}
