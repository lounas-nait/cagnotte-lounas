import React, { useState } from "react";
import { useAuth0 } from '@auth0/auth0-react';

import '../styles/style.css';
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import { Form, Row, Alert, Button, Col } from "react-bootstrap";

function CreerCagnotte() {
  const [cagnotte, setCagnotte] = useState({
    nom: "",
    description: "",
    montantObjectif: "",
  });
  const [validated, setValidated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showErreur, setShowErreur] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  function handleChange(event) {
    const { name, value } = event.target;
    setCagnotte((prevCagnotte) => ({
      ...prevCagnotte,
      [name]: value,
    }));
    setShowNotif(false);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }

    setFormDisabled(true);
    const accessToken = await getAccessTokenSilently();
    fetch("/api/cagnottes", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...cagnotte,
      }),
    })
      .then(() => {
        setCagnotte({
          nom: "",
          description: "",
          montantObjectif: "",
        });
        setFormDisabled(false);
        setShowNotif(true);
        setValidated(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la cagnotte :", error);
        setShowErreur(true);
      });

    setValidated(true);
  }
  return (
    <MDBContainer fluid className="my-5">
      <Form onSubmit={handleFormSubmit} noValidate validated={validated}>
        <MDBRow className="g-0 align-items-center">
          <div
            className="cagnotteForm"
           
          >
            <h2> creer une cagnotte</h2>
            
            <br />
            <fieldset disabled={formDisabled}>
             
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    placeholder="nom de la cagnotte"
                    value={cagnotte.nom}
                    onChange={handleChange
                    }
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez saisir le nom
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    as="textarea"
                    rows={4}
                    placeholder="description de la cagnotte"
                    value={cagnotte.description}
                    onChange={handleChange
                    }
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez saisir la description
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>montant</Form.Label>
                  <Form.Control
                    type="number"
                    name="montantObjectif"
                    placeholder="montant cagnotte"
                    value={cagnotte.montantObjectif}
                    onChange={handleChange
                    }
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez saisir le montant 
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
             
              <br />
              <div>
                <Button type="submit" className="btn btn-success">
                  Créer la cagnotte
                </Button>
              </div>
            </fieldset>
            <br />
            {showNotif && (
              <Alert
                className="alertNotif"
                variant="success"
                dismissible
                onClose={() => setShowNotif(false)}
              >
                cagnotte crée avec success
              </Alert>
            )}
            {showErreur && (
              <Alert
              className="alertNotif"
                variant="danger"
                dismissible
                onClose={() => setShowErreur(false)}
              >
                xx
              </Alert>
            )}
          </div>
          <MDBCol col="6">
            <img
              src="https://innobenefits.com/wp-content/uploads/2021/07/shutterstock_1561815367copy.jpg"
              className="w-100 rounded-4 shadow-6"
            />
          </MDBCol>
        </MDBRow>
      </Form>
    </MDBContainer>
  );
}

export default CreerCagnotte;
