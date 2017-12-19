package app;

import app.entities.Account;
import app.entities.Point;
import app.entities.Role;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateJpaAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableJpaRepositories("app.repositories")
public class Application {

    @Bean
    public BCryptPasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

//    @Bean
//    CommandLineRunner init(
//            AccountService accountService
//    ) {
//        return (evt) -> Arrays.asList(
//                "igor1".split(",")).forEach(
//                username -> {
//                    Account acct = new Account();
//                    acct.setUsername(username);
//                    acct.setPassword("password");
//                    List<Point> points = new ArrayList<>();
//                    points.add(new Point(1,1,1));
//                    points.add(new Point(2,1,3));
//                    acct.setPoints(points);
//                    acct.grantAuthority(Role.ROLE_USER);
//                    if (username.equals("admin"))
//                        acct.grantAuthority(Role.ROLE_ADMIN);
//                    accountService.registerUser(acct);
//                }
//        );
//    }

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}