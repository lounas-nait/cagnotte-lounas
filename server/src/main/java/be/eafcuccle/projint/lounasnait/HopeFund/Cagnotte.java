package be.eafcuccle.projint.lounasnait.HopeFund;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "cagnotte")
public class Cagnotte {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "description", nullable = false)
    private String description;

    @Column(name = "montantCollecte", nullable = false)
    private double montantCollecte;

    @Column(name = "montantObjectif", nullable = false)
    private double montantObjectif;

    @Column(name = "active", nullable = false)
    private boolean active;

    @OneToMany(mappedBy = "cagnotte", fetch = FetchType.LAZY)
    @JsonIgnoreProperties("cagnotte")
    private List<Contributeur> contributeurs = new ArrayList<>();

    @ManyToOne(optional = false)
    @JoinColumn(name = "owner_id", nullable = false)
    private HopeFundUser owner;

    protected Cagnotte() {
    }

    public Cagnotte(String nom, String description, double montantObjectif, HopeFundUser owner) {
        this.nom = nom;
        this.description = description;
        this.montantObjectif = montantObjectif;
        this.owner = owner;
        montantCollecte = 0;
        this.active = true;

    }

    // Getters et setters

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getMontantCollecte() {
        return montantCollecte;
    }

    public void setMontantCollecte(double montantCollecte) {
        this.montantCollecte = montantCollecte;
    }

    public double getMontantObjectif() {
        return montantObjectif;
    }

    public void setMontantObjectif(double montantObjectif) {
        this.montantObjectif = montantObjectif;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public List<Contributeur> getContributeurs() {
        return contributeurs;
    }

    public void setContributeurs(List<Contributeur> contributeurs) {
        this.contributeurs = contributeurs;
    }

    public HopeFundUser getOwner() {
        return owner;
    }

    public void setOwner(HopeFundUser owner) {
        this.owner = owner;
    }

    public void addMontant(double montant) {
        montantCollecte = montantCollecte + montant;
    }
}
