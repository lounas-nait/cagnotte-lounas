package be.eafcuccle.projint.lounasnait.HopeFund;

import be.eafcuccle.projint.lounasnait.HopeFund.Cagnotte;
import be.eafcuccle.projint.lounasnait.HopeFund.HopeFundUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HopeFundUserRepository extends JpaRepository<HopeFundUser, UUID> {
    Optional<HopeFundUser> findByUsername(String username);

}
