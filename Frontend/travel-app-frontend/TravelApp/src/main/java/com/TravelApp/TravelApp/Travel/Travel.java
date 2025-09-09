package com.TravelApp.TravelApp.Travel;

import com.TravelApp.TravelApp.User.User;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.List;

@Entity (name = "TravelDB")
public class Travel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String country;
    private String city;
    private String hotel;
    private LocalDate date;
    private int price;
    private int numberOfRemainingSpots;

    @ManyToMany(mappedBy = "travels")
    private List<User> users;
    public Travel() {
        super();
    }

    public Travel(int id, String country, String city, String hotel, LocalDate date, int price, int numberOfRemainingSpots, User user) {
        this.id = id;
        this.country = country;
        this.city = city;
        this.hotel = hotel;
        this.date = date;
        this.price = price;
        this.numberOfRemainingSpots = numberOfRemainingSpots;
    }

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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public int getNumberOfRemainingSpots() {
        return numberOfRemainingSpots;
    }

    public void setNumberOfRemainingSpots(int numberOfRemainingSpots) {
        this.numberOfRemainingSpots = numberOfRemainingSpots;
    }

    @Override
    public String toString() {
        return "Travel{" +
                "id=" + id +
                ", country='" + country + '\'' +
                ", city='" + city + '\'' +
                ", hotel='" + hotel + '\'' +
                ", date=" + date +
                ", price=" + price +
                '}';
    }
}
