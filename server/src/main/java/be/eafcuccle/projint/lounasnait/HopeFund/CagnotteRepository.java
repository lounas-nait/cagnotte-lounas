package be.eafcuccle.projint.lounasnait.HopeFund;

import be.eafcuccle.projint.lounasnait.HopeFund.Cagnotte;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import be.eafcuccle.projint.lounasnait.HopeFund.HopeFundUser;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface CagnotteRepository extends JpaRepository<Cagnotte, UUID> {
    Page<Cagnotte> findAll(Pageable pageable);

    Page<Cagnotte> findByOwner(Pageable pageable, HopeFundUser owner);
}