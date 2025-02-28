package com.TravelApp.TravelApp.Travel;

import com.TravelApp.TravelApp.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class TravelController {

    @Autowired
    private TravelRepository travelRepository;

    public TravelController(TravelRepository travelRepository, UserRepository userRepository) {
        this.travelRepository = travelRepository;
    }

    @GetMapping("/findByCountry")
    public List<Travel> findByCountry(String country) {
        List<Travel> foundTravels = travelRepository.findByCountry(country);

        if (foundTravels.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND);
        } else {
            return foundTravels;
        }
    }

/*
    @PostMapping("/checkTravel")
    public ResponseEntity<String> checkTravel(@RequestBody Travel travel) {
        String country = travel.getCountry();

        System.out.println("Received country: " + country);

        Travel existingTravel = travelRepository.findByCountry(country);

        if (existingTravel != null) {
            // If user exists, send a success response to the React app
            return ResponseEntity.ok("Travel exists!");
        } else {
            // If user doesn't exist, send a not found response to the React app
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found!");
        }
    } */

    @PostMapping("/createTravel")
    public ResponseEntity<String> createTravel(@RequestBody Travel travel) {

        String country = travel.getCountry();
        String city = travel.getCity();
        String hotel = travel.getHotel();
        LocalDate date = travel.getDate();
        int price = travel.getPrice();
        int numberOfRemainingSpots = travel.getNumberOfRemainingSpots();

        Travel existingTravel = travelRepository.findByCountryAndCityAndHotelAndDate(country, city, hotel, date);

        if (existingTravel != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Travel already exists!");
        } else {
            travelRepository.save(travel);
            return ResponseEntity.ok("Travel created!");
        }
    }

    @PostMapping("/bookTravel/{travelId}")
    public ResponseEntity<String> bookTravel(@PathVariable Integer travelId) {

        Optional<Travel> existingTravelOptional = travelRepository.findById(travelId);

        if (existingTravelOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Travel not found!");
        }

        Travel existingTravel = existingTravelOptional.get();

        if (existingTravel.getNumberOfRemainingSpots() <= 0) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No remaining spots available.");
        }

        existingTravel.setNumberOfRemainingSpots(existingTravel.getNumberOfRemainingSpots() - 1);
        travelRepository.save(existingTravel);

        return ResponseEntity.ok("Travel booked!");
    }

}
