package com.TravelApp.TravelApp.Booking;

import com.TravelApp.TravelApp.Travel.Travel;
import com.TravelApp.TravelApp.User.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Integer> {

    List<Booking> findByUser(User user);

    Optional<Booking> findById(Integer id);

    @Override
    <S extends Booking> S save(S s);
}
