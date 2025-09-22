package com.TravelApp.TravelApp.Travel;

import com.TravelApp.TravelApp.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class TravelController {

    @Autowired
    private TravelRepository travelRepository;

    public TravelController(TravelRepository travelRepository, UserRepository userRepository) {
        this.travelRepository = travelRepository;
    }

    @GetMapping("/getAllTravels")
    public List<Travel> getAllTravels() {
        return travelRepository.findAll();
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

    @PostMapping("/createTravel")
    public ResponseEntity<String> createTravel(@RequestBody Travel travel) {

        String country = travel.getCountry();
        String city = travel.getCity();
        String hotel = travel.getHotel();

        Travel existingTravel = travelRepository.findByCountryAndCityAndHotel(
                country, city, hotel);

        if (existingTravel != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Travel already exists!");
        }

        // save travel first
        Travel savedTravel = travelRepository.save(travel);

        travelRepository.save(savedTravel); // cascade saves TravelDays too

        return ResponseEntity.ok("Travel created with days!");
    }

    @PatchMapping("/updateTravel")
    public ResponseEntity<String> updateTravel(@RequestBody Map<String, String> updateData) {

        String country = updateData.get("country");
        String city = updateData.get("city");
        String hotel = updateData.get("hotel");

        String whatToUpdate = updateData.get("whatToUpdate");
        String infoToUpdate = updateData.get("infoToUpdate");


        Travel existingTravel = travelRepository.findByCountryAndCityAndHotel(
                country, city, hotel);

        if (existingTravel != null) {
            switch (whatToUpdate) {
                case "country":
                    existingTravel.setCountry(infoToUpdate);
                    break;
                case "city":
                    existingTravel.setCity(infoToUpdate);
                    break;
                case "hotel":
                    existingTravel.setHotel(infoToUpdate);
                    break;
                case "pricePerPerson":
                    int price = Integer.parseInt(infoToUpdate);
                    existingTravel.setPricePerPerson(price);
                    break;
                case "numberOfRemainingSpots":
                    int spots = Integer.parseInt(infoToUpdate);
                    existingTravel.setNumberOfRemainingSpots(spots);
                    break;
                default:
                    break;
            }
            travelRepository.save(existingTravel);
            return ResponseEntity.ok("Travel updated!");
        }
        else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Travel not found!");
        }
    }

    @DeleteMapping("/deleteTravel")
    public ResponseEntity<String> deleteTravel(@RequestBody Map<String, String> deleteData) {
        String country = deleteData.get("country");
        String city = deleteData.get("city");
        String hotel = deleteData.get("hotel");
        String arrivalDateString = deleteData.get("arrivalDate");
        String departureDateString = deleteData.get("departureDate");

        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            travelRepository.deleteByCountryAndCityAndHotel(
                    country, city, hotel);
            return ResponseEntity.ok("Travel deleted");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Failed to delete travel");
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
