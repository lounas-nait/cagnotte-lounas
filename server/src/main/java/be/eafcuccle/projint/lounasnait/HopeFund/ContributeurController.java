package be.eafcuccle.projint.lounasnait.HopeFund;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import be.eafcuccle.projint.lounasnait.HopeFund.Cagnotte;
import be.eafcuccle.projint.lounasnait.HopeFund.CagnotteRepository;
import be.eafcuccle.projint.lounasnait.HopeFund.Contributeur;
import be.eafcuccle.projint.lounasnait.HopeFund.ContributeurRepository;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/cagnottes")
public class ContributeurController {

    private final CagnotteRepository cagnotteRepository;
    private final ContributeurRepository contributeurRepository;

    @Autowired
    public ContributeurController(CagnotteRepository cagnotteRepository,
            ContributeurRepository contributeurRepository) {
        this.cagnotteRepository = cagnotteRepository;
        this.contributeurRepository = contributeurRepository;
    }

    @PostMapping("/{id}/contributeurs")
    public ResponseEntity<Contributeur> addContributeurToCagnotte(@PathVariable("id") String id,
            @RequestBody Contributeur contributeur, UriComponentsBuilder builder) {
        contributeur.setId(UUID.randomUUID());
        UUID cagnotteId = UUID.fromString(id);

        Optional<Cagnotte> cagnotteOptional = cagnotteRepository.findById(cagnotteId);

        if (cagnotteOptional.isPresent()) {

            Cagnotte cagnotte = cagnotteOptional.get();
            contributeur.setCagnotte(cagnotte);
            Contributeur savedContributeur = contributeurRepository.save(contributeur);
            cagnotte.addMontant(contributeur.getMontant());
            cagnotteRepository.save(cagnotte);

            URI linkToNewContributeur = builder.pathSegment("api", "contributeurs", "{id}")
                    .build(savedContributeur.getId());
            return ResponseEntity.created(linkToNewContributeur).body(savedContributeur);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
