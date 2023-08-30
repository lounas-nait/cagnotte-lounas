package be.eafcuccle.projint.lounasnait.HopeFund;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import java.util.UUID;

import javax.swing.event.ChangeEvent;

@Entity
@Table(name = "contributeur")
public class Contributeur {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "nom", nullable = false)
    private String nom;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "montant", nullable = false)
    private double montant;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties("contributeurs")
    @JoinColumn(name = "cagnotte_id", nullable = false)
    private Cagnotte cagnotte;

    // Constructeurs, getters et setters

    protected Contributeur() {
    }

    public Contributeur(String nom, String email, double montant) {
        this.nom = nom;
        this.email = email;
        this.montant = montant;

    }

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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setMontant(double montant) {
        this.montant = montant;
    }

    public double getMontant() {
        return montant;
    }

    public Cagnotte getCagnotte() {
        return cagnotte;
    }

    public void setCagnotte(Cagnotte cagnotte) {
        this.cagnotte = cagnotte;
    }
}
