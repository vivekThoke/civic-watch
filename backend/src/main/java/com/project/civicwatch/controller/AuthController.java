package com.project.civicwatch.controller;

import com.project.civicwatch.config.PasswordConfig;
import com.project.civicwatch.dto.AuthRequest;
import com.project.civicwatch.dto.AuthResponse;
import com.project.civicwatch.model.Role;
import com.project.civicwatch.model.User;
import com.project.civicwatch.repository.RoleRepository;
import com.project.civicwatch.repository.UserRepository;
import com.project.civicwatch.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public String register(@RequestBody AuthRequest authRequest){
        Role role = roleRepository.findByName("CITIZEN").orElseThrow();


        User user = User.builder()
                .email(authRequest.getEmail())
                .password(passwordEncoder.encode(authRequest.getPassword()))
                .role(role)
                .build();

        userRepository.save(user);
        return "User Registered Successfully";
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest authRequest){
        User user = userRepository.findByEmail(authRequest.getEmail()).orElseThrow();
        if(!passwordEncoder.matches(authRequest.getPassword(), user.getPassword())){
            throw new RuntimeException("Invalid Credentials");
        }

        String token = jwtUtil.generateToke(user.getEmail(), user.getRole().getName());

        return new AuthResponse(token);
    }


}
