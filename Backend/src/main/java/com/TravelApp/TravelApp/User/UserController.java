package com.TravelApp.TravelApp.User;

import com.TravelApp.TravelApp.Booking.Booking;
import com.TravelApp.TravelApp.Booking.BookingRepository;
import com.TravelApp.TravelApp.Functions;
import com.TravelApp.TravelApp.JwtUtil;
import com.TravelApp.TravelApp.Travel.Travel;
import com.TravelApp.TravelApp.Travel.TravelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TravelRepository travelRepository;

    @Autowired
    BookingRepository bookingRepository;

    public UserController() {
    }

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserController(TravelRepository travelRepository) {
        this.travelRepository = travelRepository;
    }

    public UserController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping("/checkUser")
    public ResponseEntity<String> checkUser(@RequestBody Map<String, String> userData) {

        String username = userData.get("username");
        String password = userData.get("password");

        System.out.println("Received username: " + username);
        System.out.println("Received password: " + password);

        User existingUser = userRepository.findByUsernameAndPassword(username, password);

        if (existingUser != null) {
            return ResponseEntity.ok("User exists!");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }
    }

    @PostMapping("/getToken")
    public ResponseEntity<String> getToken(String username) {
        String token = JwtUtil.generateToken(username);
        return ResponseEntity.ok(token);
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

    @PostMapping("/sendId")
    public int sendId(@RequestBody Map<String, String> userData) {
        String username = userData.get("username");
        String password = userData.get("password");

        User existingUser = userRepository.findByUsernameAndPassword(username, password);
        if (existingUser != null) {
            return existingUser.getId();
        }
        else {
            return -1;
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
            userRepository.deleteByUsername(username);
            return ResponseEntity.ok("User deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete user");
        }
    }

/*
    @GetMapping("/user/{userId}/bookings")
    public ResponseEntity<?> getUserBookings(@PathVariable int userId) {
        User user = userRepository.findById(userId);

        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found!");
        }

        return ResponseEntity.ok(user.getBookings());
    }


    @DeleteMapping("/user/{userId}/bookings/{bookingId}")
    public ResponseEntity<String> removeBooking(@PathVariable int userId, @PathVariable int bookingId) {
        User user = userRepository.findById(userId);
        Booking booking = bookingRepository.findById(bookingId).orElse(null);

        if (user == null || booking == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User or Booking not found!");

        if (!user.getBookings().contains(booking))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Booking not found in user's list!");

        user.getBookings().remove(booking);
        userRepository.save(user);

        // Free travel spots
        Travel travel = booking.getTravel();
        travel.setNumberOfRemainingSpots(travel.getNumberOfRemainingSpots() + booking.getNumberOfPersons());
        travelRepository.save(travel);

        bookingRepository.delete(booking);

        return ResponseEntity.ok("Booking removed successfully!");
    }
    */
}
