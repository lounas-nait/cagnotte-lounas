package be.eafcuccle.projint.lounasnait.HopeFund;

import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "hopefund_user")
public class HopeFundUser {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false)
    private UUID id;

    @Column(name = "username", nullable = false, unique = true)
    private String username;

    protected HopeFundUser() {
    }

    HopeFundUser(String username) {
        this.username = username;
    }

    public UUID getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

}
