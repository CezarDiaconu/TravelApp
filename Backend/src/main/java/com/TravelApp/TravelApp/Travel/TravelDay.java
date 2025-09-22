package com.TravelApp.TravelApp.Travel;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
public class TravelDay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private LocalDate date;
    private int remainingSpots;

    @ManyToOne
    @JoinColumn(name = "travel_id")
    private Travel travel;

    public TravelDay() {}

    public TravelDay(LocalDate date, int remainingSpots, Travel travel) {
        this.date = date;
        this.remainingSpots = remainingSpots;
        this.travel = travel;
    }

    // getters + setters
    public int getId() { return id; }
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    public int getRemainingSpots() { return remainingSpots; }
    public void setRemainingSpots(int remainingSpots) { this.remainingSpots = remainingSpots; }
    public Travel getTravel() { return travel; }
    public void setTravel(Travel travel) { this.travel = travel; }
}
