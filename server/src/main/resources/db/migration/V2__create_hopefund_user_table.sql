-- V1_1__create_hopefund_user_table.sql

CREATE TABLE hopefund_user
(
   id UUID PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    CONSTRAINT uc_hope_fund_username UNIQUE (username)
);

INSERT INTO hopefund_user (id, username)
VALUES ('3e5a8c12-6e2b-44b8-a196-030d26c19ff6', 'auth0|64991bab508b461afc4f76c3');

ALTER TABLE cagnotte ADD owner_id uuid;
UPDATE cagnotte
  SET owner_id = '3e5a8c12-6e2b-44b8-a196-030d26c19ff6'
  WHERE owner_id IS NULL;
ALTER TABLE cagnotte
  ALTER COLUMN owner_id SET NOT NULL;

ALTER TABLE cagnotte
    ADD CONSTRAINT fk_cagnotte_owner_id FOREIGN KEY (owner_id) REFERENCES hopefund_user (id);
CREATE INDEX idx_cagnotte_owner_id ON cagnotte (owner_id);