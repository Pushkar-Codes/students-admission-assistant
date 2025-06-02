package com.Rupankar.BackendJavaERP.Student;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;

public interface StudentRepo extends MongoRepository<StudentModel, String> {

    // Fetch all name
    @Query(value = "{}", fields = "{ 'fullName' : 1, '_id': 0 }")
    List<FullNameOnly> findAllFullNames();

    // Fetch all emails
    @Query(value = "{}", fields = "{ 'email' : 1, '_id' : 0 }")
    List<EmailOnly> findAllEmails();

    // Fetch all genders
    @Query(value = "{}", fields = "{ 'gender' : 1, '_id' : 0 }")
    List<GenderOnly> findAllGenders();

    // Fetch all schoolName
    @Query(value = "{}", fields = "{ 'schoolName' : 1, '_id' : 0 }")
    List<SchoolNameOnly> findAllSchoolNames();

    // Fetch all currentClass
    @Query(value = "{}", fields = "{ 'currentClass' : 1, '_id' : 0 }")
    List<CurrentClassOnly> findAllCurrentClasses();

    // Fetch all student phone number
    @Query(value = "{}", fields = "{ 'studentPhoneNumber' : 1, '_id' : 0 }")
    List<StudentPhoneNumberOnly> findAllStudentPhoneNumber();

    // Fetch all parent phone number
    @Query(value = "{}", fields = "{ 'parentPhoneNumber' : 1, '_id' : 0 }")
    List<ParentPhoneNumberOnly> findAllParentPhoneNumber();

    // Fetch all parentHasWhatsapp
    @Query(value = "{}", fields = "{ 'parentHasWhatsapp' : 1, '_id' : 0 }")
    List<ParentHasWhatsappOnly> findAllParentHasWhatsapp();

    // Fetch all studentHasWhatsapp
    @Query(value = "{}", fields = "{ 'studentHasWhatsapp' : 1, '_id' : 0 }")
    List<StudentHasWhatsappOnly> findAllStudentHasWhatsapp();


    // Name projection
    interface FullNameOnly {
        String getFullName();
    }

    // Emails projection
    interface EmailOnly {
        String getEmail();
    }

    // Gender projection
    interface GenderOnly {
        String getGender();
    }

    // SchoolName Projections
    interface SchoolNameOnly {
        String getSchoolName();
    }

    // Current Class projections
    interface CurrentClassOnly {
        String getCurrentClass();
    }

    // StudentPhoneNumber projections
    interface StudentPhoneNumberOnly {
        String getStudentPhoneNumber();
    }

    // ParentPhoneNumber projections
    interface ParentPhoneNumberOnly {
        String getParentPhoneNumber();
    }

    // Parent Has Whatsapp projections
    interface ParentHasWhatsappOnly {
        Boolean getParentHasWhatsapp();
    }

    // Student Has WhatsappOnly projection
    interface StudentHasWhatsappOnly {
        Boolean getStudentHasWhatsapp();
    }
}
