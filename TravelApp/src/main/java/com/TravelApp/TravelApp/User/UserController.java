package com.TravelApp.TravelApp.User;

import com.TravelApp.TravelApp.Functions;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class UserController {

    private UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }



    @PostMapping("/checkUser")
    public ResponseEntity<String> checkUser(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        System.out.println("Received username: " + username);
        System.out.println("Received password: " + password);

        // Check if a user with the same username and password already exists
        User existingUser = userRepository.findByUsernameAndPassword(username, password);

        if (existingUser != null) {
            // If user exists, send a success response to the React app
            return ResponseEntity.ok("User exists!");
        } else {
            // If user doesn't exist, send a not found response to the React app
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PostMapping("/sendEmail")
    public String sendEmail(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        User existingUser = userRepository.findByUsernameAndPassword(username, password);
        if (existingUser != null) {
            return existingUser.getEmail();
        }
        else {
            return null;
        }
    }

    @PostMapping("/createUser")
    public ResponseEntity<String> createUser(@RequestBody User user) {

        String username = user.getUsername();
        String email = user.getEmail();
        String password = user.getPassword();

        System.out.println("Received username: " + username);
        System.out.println("Received email: " + email);
        System.out.println("Received password: " + password);

        if (Functions.isValidPassword(password) != false) {
            User existingUser = userRepository.findByUsername(username);


            if (existingUser != null) {
                // If user already exists, respond with a message indicating that
                return ResponseEntity.ok("User already exists!");
            } else {
                // If user doesn't exist, save the new user
                userRepository.save(user);

                // Respond with a success message
                return ResponseEntity.ok("User created successfully!");
            }
        }
        else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password must be safer!");
        }
    }

    @PatchMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestBody Map<String, String> updateData){
        String userUsername = updateData.get("username");
        String userPassword = updateData.get("password");
        String whatToUpdate = updateData.get("whatToUpdate");
        String infoToUpdate = updateData.get("infoToUpdate");


        User user = userRepository.findByUsernameAndPassword(userUsername, userPassword);

        if( user != null) {
            switch (whatToUpdate) {
                case "username":
                    user.setUsername(infoToUpdate);
                    break;
                case "email":
                    user.setEmail(infoToUpdate);
                    break;
                case "password":
                    user.setPassword(infoToUpdate);
                    break;
                default: break;
            }
            userRepository.save(user);
            return ResponseEntity.ok(user);
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteUser")
    @Transactional
    public ResponseEntity<String> deleteUser(@RequestBody Map<String, String> deleteUser) {
        String username = deleteUser.get("username");

        try {
            // Delete by username using the custom repository method
            userRepository.deleteByUsername(username);
            return ResponseEntity.ok("User deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }
}
