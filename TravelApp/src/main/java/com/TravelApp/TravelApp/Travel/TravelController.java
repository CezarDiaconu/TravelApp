package com.TravelApp.TravelApp.Travel;

import com.TravelApp.TravelApp.User.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
public class TravelController {

    private TravelRepository travelRepository;

    public TravelController(TravelRepository travelRepository, UserRepository userRepository) {
        this.travelRepository = travelRepository;
    }



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
    }

    @PostMapping("/createTravel")
    public ResponseEntity<String> createTravel(@RequestBody Travel travel) {

        String country = travel.getCountry();
        String city = travel.getCity();
        String hotel = travel.getHotel();
        LocalDate date = travel.getDate();
        int price = travel.getPrice();

        Travel existingTravel = travelRepository.findByCountryAndCityAndHotelAndDate(country, city, hotel, date);

        if (existingTravel != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Travel already exists!");
        } else {
            travelRepository.save(travel);
            return ResponseEntity.ok("Travel created!");
        }
    }
}
