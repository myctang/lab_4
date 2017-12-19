package app.repositories;

import app.entities.Account;
import org.springframework.data.repository.Repository;

import java.util.Optional;

public interface AccountRepo extends Repository<Account, Long> {

    Optional<Account> findByUsername(String username);
    Account save(Account account);
    void deleteAccountById(Long id);
}
