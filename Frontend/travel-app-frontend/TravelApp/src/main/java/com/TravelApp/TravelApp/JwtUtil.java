package com.TravelApp.TravelApp;

import io.jsonwebtoken.*;

import java.util.Date;

public class JwtUtil {
    private static final String SECRET = "b7d17f2d21a2ff98d6b1f7de9c1bd923b2346b16ac78e1d47c6ebd2e6ec1be92b7d17f2d21a2ff98d6b1f7de9c1bd923b2346b16ac78e1d47c6ebd2e6ec1be92";
    private static final long EXPIRATION_TIME = 864_000_000; // 10 days
    public static String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }
    public static String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
