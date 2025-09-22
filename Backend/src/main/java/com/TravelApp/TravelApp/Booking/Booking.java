package com.TravelApp.TravelApp.Booking;

import com.TravelApp.TravelApp.Travel.Travel;
import com.TravelApp.TravelApp.User.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name ="BookingDB")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate arrivalDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate departureDate;

    private int numberOfPersons;
    private double totalPrice;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "travel_id", nullable = false)
    private Travel travel;

    public Booking() {
    }

    public Booking(Long id, LocalDate arrivalDate, LocalDate departureDate, int numberOfPersons, double totalPrice, Travel travel) {
        this.id = id;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.numberOfPersons = numberOfPersons;
        this.totalPrice = totalPrice;
        this.travel = travel;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public LocalDate getDepartureDate() {
        return departureDate;
    }

    public void setDepartureDate(LocalDate departureDate) {
        this.departureDate = departureDate;
    }

    public int getNumberOfPersons() {
        return numberOfPersons;
    }

    public void setNumberOfPersons(int numberOfPersons) {
        this.numberOfPersons = numberOfPersons;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Travel getTravel() {
        return travel;
    }

    public void setTravel(Travel travel) {
        this.travel = travel;
    }

    @Override
    public String toString() {
        return "Booking{" +
                "id=" + id +
                ", arrivalDate=" + arrivalDate +
                ", departureDate=" + departureDate +
                ", numberOfPersons=" + numberOfPersons +
                ", totalPrice=" + totalPrice +
                ", travel=" + travel +
                '}';
    }

    public double calculatePrice() {
        long days = java.time.temporal.ChronoUnit.DAYS.between(arrivalDate, departureDate);
        return numberOfPersons * days * travel.getPricePerPerson();
    }
}


