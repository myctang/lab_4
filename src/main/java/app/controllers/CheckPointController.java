package app.controllers;

import app.AccountService;
import app.entities.Account;
import app.entities.Point;
import app.repositories.AccountRepo;
import app.repositories.PointRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import static org.springframework.web.bind.annotation.RequestMethod.POST;

@RestController
public class CheckPointController {
    @Autowired
    AccountService service;

    @Autowired
    PointRepo pointService;

    @Autowired
    AccountRepo accountService;

    @GetMapping(value = "/api/points", produces = "application/json")
    public List<Point> getPoints(){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Account> account = accountService.findByUsername(authentication.getName());
        if (account.isPresent())
            return account.get().getPoints();
        else
            return null;
    }

    @PostMapping(value = "/api/addPoint", produces = "application/json")
    public Point addPoint(@RequestBody Point point){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Optional<Account> account = accountService.findByUsername(authentication.getName());
        if (point.getR() > 0 && point.getR() <=3 && point.getX()>=-5 && point.getX() <=3 && point.getY() >= -5 &&
                point.getY() <= 5) {
            if (account.isPresent()) {
                account.get().getPoints().add(point);
                accountService.save(account.get());
                return point;
            }
        }
        return null;
    }

    @PostMapping(value = "/api/register")
    public boolean register(@RequestBody Account account){
        service.registerUser(account);
        return true;
    }
}
