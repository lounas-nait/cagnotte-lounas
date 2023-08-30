-- V1_2__create_contributeur_table.sql

CREATE TABLE contributeur (
  id UUID PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  montant DOUBLE, 
  cagnotte_id UUID, 
  FOREIGN KEY (cagnotte_id) REFERENCES cagnotte(id)
);

