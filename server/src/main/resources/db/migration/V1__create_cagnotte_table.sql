-- V1_2__create_cagnotte_table.sql

CREATE TABLE cagnotte (
    id UUID PRIMARY KEY,
    nom VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    montant_collecte DOUBLE,
    montant_objectif DOUBLE,
    active BOOLEAN
    
);
