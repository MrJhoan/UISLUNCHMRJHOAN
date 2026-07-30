package com.project.lunchuis.Service;

import com.project.lunchuis.Model.Buy;
import com.project.lunchuis.Model.User;
import com.project.lunchuis.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public void addPurchase(Long userId, Buy buy) {
        Optional<User> user = userRepository.findById(userId);
        user.ifPresent(u -> {
            u.getPurchases().add(buy);
            userRepository.save(u);
        });
    }

    public Optional<User> authenticate(String code, String password) {
        Optional<User> user = userRepository.findByCode(code);
        if (user.isEmpty()) {
            return Optional.empty();
        }

        User existingUser = user.get();
        String storedPassword = existingUser.getPassword();
        boolean usesBCrypt = storedPassword != null && storedPassword.startsWith("$2");
        boolean authenticated = usesBCrypt
                ? passwordEncoder.matches(password, storedPassword)
                : password != null && password.equals(storedPassword);

        if (!authenticated) {
            return Optional.empty();
        }

        if (!usesBCrypt) {
            existingUser.setPassword(passwordEncoder.encode(password));
            userRepository.save(existingUser);
        }

        return Optional.of(existingUser);
    }
}
