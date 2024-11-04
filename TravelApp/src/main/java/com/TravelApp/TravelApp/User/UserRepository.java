package com.TravelApp.TravelApp.User;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    public User findByUsername(String username);
    public User findByUsernameAndPassword(String username, String Password);

    @Override
    <S extends User> S save(S user);

    @Transactional
    void deleteByUsername(String username);
}
