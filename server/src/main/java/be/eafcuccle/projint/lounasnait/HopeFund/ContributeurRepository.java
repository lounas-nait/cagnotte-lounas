package be.eafcuccle.projint.lounasnait.HopeFund;

import java.util.UUID;
import java.util.List;
import be.eafcuccle.projint.lounasnait.HopeFund.Contributeur;
import be.eafcuccle.projint.lounasnait.HopeFund.Cagnotte;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContributeurRepository extends JpaRepository<Contributeur, UUID> {
    List<Contributeur> findAll();

    void deleteByCagnotte(Cagnotte cagnotte);
}
