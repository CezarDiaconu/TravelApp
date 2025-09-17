package com.TravelApp.TravelApp.Travel;

import com.TravelApp.TravelApp.User.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity(name = "TravelDB")
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String country;
    private String city;
    private String hotel;
    private int pricePerPerson;
    private int numberOfRemainingSpots;

    @ManyToMany(mappedBy = "travels")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    @OneToMany(mappedBy = "travel", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TravelDay> travelDays = new ArrayList<>();

    public Travel() {
        // default constructor required by JPA
    }

    public Travel(String country, String city, String hotel,
                  int pricePerPerson, int numberOfRemainingSpots) {
        this.country = country;
        this.city = city;
        this.hotel = hotel;
        this.pricePerPerson = pricePerPerson;
        this.numberOfRemainingSpots = numberOfRemainingSpots;
    }

    // Getters and setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getHotel() {
        return hotel;
    }

    public void setHotel(String hotel) {
        this.hotel = hotel;
    }

    public int getPricePerPerson() {
        return pricePerPerson;
    }

    public void setPricePerPerson(int pricePerPerson) {
        this.pricePerPerson = pricePerPerson;
    }

    public int getNumberOfRemainingSpots() {
        return numberOfRemainingSpots;
    }

    public void setNumberOfRemainingSpots(int numberOfRemainingSpots) {
        this.numberOfRemainingSpots = numberOfRemainingSpots;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public List<TravelDay> getTravelDays() {
        return travelDays;
    }

    public void setTravelDays(List<TravelDay> travelDays) {
        this.travelDays = travelDays;
    }

    @Override
    public String toString() {
        return "Travel{" +
                "id=" + id +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", hotel='" + hotel + '\'' +
                ", pricePerPerson=" + pricePerPerson +
                ", numberOfRemainingSpots=" + numberOfRemainingSpots +
                '}';
    }
}
