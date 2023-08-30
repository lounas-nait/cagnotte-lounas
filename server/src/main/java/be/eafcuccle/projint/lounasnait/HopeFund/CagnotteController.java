package be.eafcuccle.projint.lounasnait.HopeFund;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.net.URI;
import java.util.UUID;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/cagnottes")
public class CagnotteController {

    private final CagnotteRepository cagnotteRepository;
    private final ContributeurRepository contributeurRepository;
    private final HopeFundUserRepository hopefunduserRepository;

    private static final Logger logger = LoggerFactory.getLogger(CagnotteController.class);

    @Autowired
    public CagnotteController(CagnotteRepository cagnotteRepository, ContributeurRepository contributeurRepository,
            HopeFundUserRepository hopefunduserRepository) {
        this.cagnotteRepository = cagnotteRepository;
        this.contributeurRepository = contributeurRepository;
        this.hopefunduserRepository = hopefunduserRepository;
    }

    @GetMapping
    public ResponseEntity<Page<Cagnotte>> getAllCagnottes(Pageable pageable, Authentication authentication) {

        /*
         * if (hasAuthority(authentication, "SCOPE_read:all-cagnottes")) {
         * Page<Cagnotte> cagnottesPage1 = cagnotteRepository.findAll(pageable);
         * return ResponseEntity.ok(cagnottesPage1);
         */

        if (hasAuthority(authentication, "SCOPE_read:your-cagnottes")) {
            String username = authentication.getName();
            HopeFundUser owner = hopefunduserRepository.findByUsername(username).orElseGet(() -> {
                HopeFundUser newUser = new HopeFundUser(username);
                return hopefunduserRepository.save(newUser);
            });
            Page<Cagnotte> cagnottesPage = cagnotteRepository.findByOwner(pageable, owner);
            return ResponseEntity.ok(cagnottesPage);
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

    }

    @PostMapping
    public ResponseEntity<Cagnotte> addCagnotte(@RequestBody Cagnotte cagnotte, UriComponentsBuilder builder,
            Authentication authentication) {
        String username = authentication.getName();

        HopeFundUser owner = hopefunduserRepository.findByUsername(username).orElseGet(() -> {
            HopeFundUser newUser = new HopeFundUser(username);
            return hopefunduserRepository.save(newUser);
        });
        cagnotte.setId(UUID.randomUUID());
        Cagnotte savedCagnotte = cagnotteRepository
                .save(new Cagnotte(cagnotte.getNom(), cagnotte.getDescription(), cagnotte.getMontantObjectif(), owner));
        logger.info("Cagnotte ajoutée : {}", savedCagnotte);
        URI linkToNewCagnotte = builder.pathSegment("api", "cagnottes", "{id}").build(savedCagnotte.getId());
        return ResponseEntity.created(linkToNewCagnotte).body(savedCagnotte);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cagnotte> getCagnotteDetails(@PathVariable UUID id) {
        Optional<Cagnotte> cagnotteOptional = cagnotteRepository.findById(id);
        if (cagnotteOptional.isPresent()) {
            Cagnotte cagnotte = cagnotteOptional.get();
            return ResponseEntity.ok(cagnotte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cagnotte> updateCagnotte(@PathVariable UUID id, @RequestBody Cagnotte updateCagnotte) {
        Optional<Cagnotte> cagnotteOptional = cagnotteRepository.findById(id);
        if (cagnotteOptional.isPresent()) {
            Cagnotte cagnotte = cagnotteOptional.get();
            cagnotte.setMontantObjectif(updateCagnotte.getMontantObjectif());

            Cagnotte updatedCagnotte = cagnotteRepository.save(cagnotte);
            return ResponseEntity.ok(updatedCagnotte);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity<Void> deleteCagnotte(@PathVariable UUID id) {
        Optional<Cagnotte> cagnotteOptional = cagnotteRepository.findById(id);
        if (cagnotteOptional.isPresent()) {
            Cagnotte cagnotte = cagnotteOptional.get();
            contributeurRepository.deleteByCagnotte(cagnotte);
            cagnotteRepository.delete(cagnotte);
            logger.info("Cagnotte supprimée : {}", cagnotte);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    private static boolean hasAuthority(Authentication authentication, String expectedAuthority) {
        return authentication.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals(expectedAuthority));
    }
}
