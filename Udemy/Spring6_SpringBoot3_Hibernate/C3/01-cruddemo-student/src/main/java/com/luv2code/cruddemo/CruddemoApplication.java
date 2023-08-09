package com.luv2code.cruddemo;

import com.luv2code.cruddemo.dao.StudentDAO;
import com.luv2code.cruddemo.dao.StudentDAOImpl;
import com.luv2code.cruddemo.entity.Student;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.List;

@SpringBootApplication
public class CruddemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(CruddemoApplication.class, args);
	}

	// this method is to simulate client's CRUD operations, it runs after SpringBoot has set up the context
	@Bean
	public CommandLineRunner commandLineRunner(StudentDAO studentDAO ){	// executed after the Spring beans have been loaded
		return runner -> {
//			createStudent(studentDAO);
			createMultipleStudent(studentDAO);

//			readStudent(studentDAO);
//			queryForStudents(studentDAO);
//			queryForStudentByLastName(studentDAO);

//			updateStudent(studentDAO);
//			updateAllStudentLastName(studentDAO);

//			deleteStudent(studentDAO);
//			deleteAllStudent(studentDAO);

		};
	}

	private void deleteAllStudent(StudentDAO studentDAO) {
		System.out.println("Deleting all students ...");
		int  numRowsDeleted = studentDAO.deleteAll();
		System.out.println("Deleted rows count: " + numRowsDeleted);
	}

	private void deleteStudent(StudentDAO studentDAO) {
		int studentId = 3;
		System.out.println("Deleting student id: " + studentId);

		studentDAO.delete(studentId);
	}

	private void updateAllStudentLastName(StudentDAO studentDAO) {
		int numRowsUpdated = studentDAO.updateAllStudentLastName("Tester");
		System.out.println("number of rows updated: " + numRowsUpdated);
	}

	private void updateStudent(StudentDAO studentDAO) {
		// retrieve student based on Id
		int studentId = 1;
		System.out.println("Getting student with id: " + studentId);
		Student myStudent = studentDAO.findById(studentId);

		// change first name
		System.out.println("Update student ...");
		myStudent.setFirstName("Scooby");

		// update student in database
		studentDAO.update(myStudent);

		// display update student
		System.out.println("Update student" + myStudent);

	}

	private void queryForStudentByLastName(StudentDAO studentDAO) {
		List<Student> theStudents = studentDAO.findByLastName("Doe");

		for(Student tempStudent:theStudents){
			System.out.println(tempStudent);
		}
	}

	private void queryForStudents(StudentDAO studentDAO) {
		// get a list of students
		List<Student> theStudents = studentDAO.findAll();

		// display list of student
		for(Student tempStudent:theStudents){
			System.out.println(tempStudent);
		}

	}

	private void readStudent(StudentDAO studentDAO) {
		// create a student obj
		System.out.println("creating a student obj...");
		Student tempStudent = new Student("Daffy", "Duck", "daffy@luv2code.com");

		// save the student
		System.out.println("Saving the student");
		studentDAO.save(tempStudent);

		// display id of the saved student
		int theId = tempStudent.getId();
		System.out.println("saved student: with Generated id: " + theId);

		// retrieve student based on the id: pk
		System.out.println("Retrieving student with id: " + theId);
		Student myStudent = studentDAO.findById(theId);

		// display student read
		System.out.println("Found the student: " + myStudent);
	}


	private void createMultipleStudent(StudentDAO studentDAO) {
		// create multiple students
		System.out.println("Creating new student object...");
		Student tempStudent1 = new Student ("John", "Doe", "john@luv2code.com");
		Student tempStudent2 = new Student ("Mary", "Public", "mary@luv2code.com");
		Student tempStudent3 = new Student ("Bonita", "Applebum", "bonita@luv2code.com");

		// save the students objects
		System.out.println("saving the students ...");
		studentDAO.save(tempStudent1);
		studentDAO.save(tempStudent2);
		studentDAO.save(tempStudent3);

	}

	private void createStudent(StudentDAO studentDAO) {
		// create the student object
		System.out.println("Creating new student object...");
		Student tempStudent = new Student ("Paul", "Doe", "paul@luv2code.com");

		// save the student object
		System.out.println("saving the student...");
		studentDAO.save(tempStudent);

		// display id of the saved student
		System.out.println("Saved student. Generated id: " + tempStudent.getId());

	}


}
