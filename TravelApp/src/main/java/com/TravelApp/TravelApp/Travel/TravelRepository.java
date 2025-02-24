package com.TravelApp.TravelApp.Travel;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface TravelRepository extends JpaRepository<Travel, Integer> {

    //public Travel findByCountry(String country);
    public Travel findByCountryAndCityAndHotelAndDate(String country, String city, String hotel, LocalDate date);
    public Travel findById(int id);
    public List<Travel> findByCountry(String country);

    @Override
    <S extends Travel> S save(S s);

}
