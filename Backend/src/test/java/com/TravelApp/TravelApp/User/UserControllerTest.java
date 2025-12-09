package com.TravelApp.TravelApp.User;

import com.TravelApp.TravelApp.Functions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserController userController;

    @Test
    public void testGetAllUsers_ShouldReturnListOfUsers() {

        UserRepository localMockRepo = org.mockito.Mockito.mock(UserRepository.class);

        User user1 = new User();
        user1.setUsername("Alice");
        User user2 = new User();
        user2.setUsername("Bob");
        List<User> mockList = Arrays.asList(user1, user2);

        when(localMockRepo.findAll()).thenReturn(mockList);

        UserController localController = new UserController(localMockRepo);

        List<User> result = localController.getAllUsers();

        assertEquals(2, result.size());
        assertEquals("Alice", result.get(0).getUsername());
    }


    @Test
    public void testCheckUser_WhenUserExists_ShouldReturnOk() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");

        when(userRepository.findByUsernameAndPassword("test", "test")).
                thenReturn(mockUser);

        ResponseEntity<String> response = userController.checkUser(requestData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User exists!", response.getBody());
    }

    @Test
    public void testCheckUser_WhenUserDoesNotExist_ShouldReturnNotFound() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        when(userRepository.findByUsernameAndPassword("test", "test")).
                thenReturn(null);

        ResponseEntity<String> response = userController.checkUser(requestData);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found!", response.getBody());
    }

    @Test
    public void testCheckUser_WhenJustOneParameterExists_ShouldReturnNotFound() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "");

        when(userRepository.findByUsernameAndPassword("test", "")).
                thenReturn(null);

        ResponseEntity<String> response = userController.checkUser(requestData);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found!", response.getBody());
    }

    @Test
    public void testGetToken_ShouldReturnToken() {

        String mockUsername = new String("test");

        ResponseEntity<String> response = userController.getToken(mockUsername);

        assertEquals(HttpStatus.OK, response.getStatusCode());

    }

    @Test
    public void testGetToken_ShouldGetRole() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setRole("admin");

        when(userRepository.findByUsername("test")).thenReturn(mockUser);

        ResponseEntity<String> response = userController.getRole(requestData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("admin", response.getBody());
    }

    @Test
    public void testGetToken_ShouldNotGetRole() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "");

        when(userRepository.findByUsername("")).thenReturn(null);

        ResponseEntity<String> response = userController.getRole(requestData);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("User not found!", response.getBody());
    }

    @Test
    public void testSendEmail_ShouldSendEmail() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");
        mockUser.setEmail("testEmail");

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(mockUser);

        String response = userController.sendEmail(requestData);

        assertEquals("testEmail", response);

    }

    @Test
    public void testSendEmail_ShouldNotSendEmail() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");
        mockUser.setEmail("testEmail");

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(null);

        String response = userController.sendEmail(requestData);

        assertEquals(null, response);
    }

    @Test
    public void testSendId_ShouldSendId() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");
        mockUser.setId(25);

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(mockUser);

        int response = userController.sendId(requestData);

        assertEquals(25, response);
    }

    @Test
    public void testSendId_ShouldNotSendId() {

        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");
        mockUser.setId(25);

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(null);

        int response = userController.sendId(requestData);

        assertEquals(-1, response);
    }

    @Test
    public void testCreateUser_ShouldCreateUser() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("email", "testEmail");
        requestData.put("password", "Test567890@");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setEmail("testEmail");
        mockUser.setPassword("Test567890@");

        when(userRepository.findByUsername("test")).thenReturn(null);
        when(userRepository.save(mockUser)).thenReturn(mockUser);

        ResponseEntity<String> response = userController.createUser(mockUser);

        assertEquals(HttpStatus.OK, userController.createUser(mockUser).getStatusCode());
        assertEquals("User created successfully!", response.getBody());
    }

    @Test
    public void testCreateUser_ShouldNotCreateUser() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("email", "testEmail");
        requestData.put("password", "Test567890@");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setEmail("testEmail");
        mockUser.setPassword("1234");

        ResponseEntity<String> response = userController.createUser(mockUser);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Password must be safer!", response.getBody());
    }

    @Test
    public void testCreateUser_UserAlreadyExists() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("email", "testEmail");
        requestData.put("password", "Test567890@");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setEmail("testEmail");
        mockUser.setPassword("Test54545454@");

        when(userRepository.findByUsername("test")).thenReturn(mockUser);

        ResponseEntity<String> response = userController.createUser(mockUser);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("User already exists!", response.getBody());
    }

    @Test
    public void testUpdateUser_ShouldUpdateUser() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");
        requestData.put("whatToUpdate", "password");
        requestData.put("infoToUpdate", "12345678Haha@");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(mockUser);
        when(userRepository.save(mockUser)).thenReturn(mockUser);

        // was getting a strange null pointer error without this additional controller
        UserController controllerUnderTest = new UserController(userRepository);

        ResponseEntity<User> response = controllerUnderTest.updateUser(requestData);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(mockUser, response.getBody());
    }

    @Test
    public void testUpdateUser_ShouldNotUpdateUser() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");
        requestData.put("whatToUpdate", "passwrd");
        requestData.put("infoToUpdate", "12345678");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(null);

        ResponseEntity<User> response = userController.updateUser(requestData);

        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testUpdateUser_ShouldNotUpdateUser2() {
        Map<String, String> requestData = new HashMap<>();
        requestData.put("username", "test");
        requestData.put("password", "test");
        requestData.put("whatToUpdate", "password");
        requestData.put("infoToUpdate", "1234");

        User mockUser = new User();
        mockUser.setUsername("test");
        mockUser.setPassword("test");

        when(userRepository.findByUsernameAndPassword("test", "test")).thenReturn(mockUser);

        UserController controllerUnderTest = new UserController(userRepository);

        ResponseEntity<User> response = controllerUnderTest.updateUser(requestData);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }
}