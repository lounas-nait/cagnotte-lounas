package be.eafcuccle.projint.lounasnait.HopeFund;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@ActiveProfiles("test")
class CagnotteTest {

    @Autowired
    private TestEntityManager entityManager;

    @Test
    void persistCagnotte() {
        HopeFundUser owner = new HopeFundUser("TestUser");
        entityManager.persist(owner);
        Cagnotte cagnotte = new Cagnotte("Test", "Description", 100.0, owner);
        Cagnotte savedCagnotte = entityManager.persistFlushFind(cagnotte);
        assertNotNull(savedCagnotte.getId());
        assertEquals("Test", savedCagnotte.getNom());
        assertEquals("Description", savedCagnotte.getDescription());
        assertEquals(100.0, savedCagnotte.getMontantObjectif());
    }
}
