package com.TravelApp.TravelApp.Booking;

import com.TravelApp.TravelApp.Travel.Travel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    @Override
    <S extends Booking> S save(S s);
}
