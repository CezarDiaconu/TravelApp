package com.TravelApp.TravelApp.Booking;

import com.TravelApp.TravelApp.Travel.Travel;
import com.TravelApp.TravelApp.Travel.TravelRepository;
import com.TravelApp.TravelApp.User.User;
import com.TravelApp.TravelApp.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@RestController
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;
    private final TravelRepository travelRepository;
    private final UserRepository userRepository;

    public BookingController(BookingRepository bookingRepository, TravelRepository travelRepository, UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.travelRepository = travelRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/createBooking")
    public ResponseEntity<String> createBooking(@RequestBody Booking bookingRequest) {

        if (bookingRequest.getNumberOfPersons() <= 0) {
            return ResponseEntity.badRequest().body("Number of persons must be > 0");
        }

        if (bookingRequest.getArrivalDate().isAfter(bookingRequest.getDepartureDate())) {
            return ResponseEntity.badRequest().body("Arrival date must be before departure date");
        }

        // get travel
        int travelId = bookingRequest.getTravel().getId();
        Travel travel = travelRepository.findById(travelId);
        if (travel == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found");
        }

        // get user
        int userId = bookingRequest.getUser().getId();
        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Booking booking = new Booking();
        booking.setArrivalDate(bookingRequest.getArrivalDate());
        booking.setDepartureDate(bookingRequest.getDepartureDate());
        booking.setNumberOfPersons(bookingRequest.getNumberOfPersons());
        booking.setTravel(travel);
        booking.setUser(user);

        double price = booking.calculatePrice();
        booking.setTotalPrice(price);

        bookingRepository.save(booking);

        return ResponseEntity.ok("Booking created successfully with total price: " + price);
    }

    @GetMapping("/user/{userId}/bookings")
    public ResponseEntity<List<Booking>> getUserBookings(@PathVariable int userId) {
        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        List<Booking> bookings = bookingRepository.findByUser(user);
        return ResponseEntity.ok(bookings);
    }

    @DeleteMapping("/user/{userId}/bookings/{bookingId}")
    public ResponseEntity<String> deleteBooking(
            @PathVariable int userId,
            @PathVariable int bookingId) {

        User user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }

        Booking booking = bookingRepository.findById(bookingId).orElse(null);
        if (booking == null || booking.getUser() == null || booking.getUser().getId() != user.getId()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Booking not found for this user");
        }

        bookingRepository.delete(booking);
        return ResponseEntity.ok("Booking deleted successfully");
    }

}
