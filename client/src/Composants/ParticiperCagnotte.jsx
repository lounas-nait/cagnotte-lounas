import '../styles/style.css';

import React, { useState } from "react";
import { Form, Row, Alert, Button, Spinner } from "react-bootstrap";
import useSWR from "swr";
import "../index.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import { useAuth0 } from '@auth0/auth0-react';



function ParticiperCagnotte({cagnotte1}) {
  const [contributeur, setContributeur] = useState({
    cagnotteId: "",
    nom: "",
    email: "",
    montant: "",
  });
  const [validated, setValidated] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showErreur, setShowErreur] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);

  const { getAccessTokenSilently } = useAuth0();

  const fetcher = async (url) => {
    const accessToken = await getAccessTokenSilently();
    return fetch(url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }).then((r) => r.json());
  };


  const { data, error } = useSWR("/api/cagnottes", fetcher);

  if (error) {
    return <div>Erreur: Impossible de charger les cagnottes</div>;
  }

  if (!data) {
    return <Spinner animation="border" />;
  }

  function handleChange(newContributeur) {
    setContributeur(newContributeur);
    setShowNotif(false);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    if (form.checkValidity() === true) {
      setFormDisabled(true);
      const accessToken = await getAccessTokenSilently();
      fetch(`api/cagnottes/${contributeur.cagnotteId}/contributeurs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contributeur),
      })
        .then(() => {
          setContributeur({
            cagnotteId: "",
            nom: "",
            email: "",
            montant: "",
          });
          setFormDisabled(false);
          setShowNotif(true);
          setValidated(false);
        })
        .catch((error) => {
          console.error("Erreur lors de l'enregistrement du contributeur:", error);
          setShowErreur(true);
          setFormDisabled(false);
        });
    } else {
      setValidated(true);
    }
  }


  return (
    <MDBContainer fluid className="my-5">
    <Form onSubmit={handleFormSubmit} noValidate validated={validated}>
      <MDBRow className="g-0 align-items-center">
        <div
          className="cagnotteForm"
          style={{
            background: "hsla(0, 0%, 100%, 0.55)",
            backdropFilter: "blur(30px)",
          }}
        >
          <h2>Choisissez une cagnotte</h2>
          <br />
          <fieldset disabled={formDisabled}>
            <Row>
              <Form.Group>
                <Form.Label>Cagnotte</Form.Label>
                <Form.Select
                  name="idCagnotte"
                  value={contributeur.cagnotteId}
                  onChange={(event) =>
                    handleChange({
                      ...contributeur,
                      cagnotteId: event.target.value,
                    })
                  }
                  required
                >
                  <option value="">Sélectionnez une cagnotte</option>
                  {data.content.map((cagnotte) => (
                    <option key={cagnotte.id} value={cagnotte.id}>
                      {cagnotte.nom}
                    </option>
                  ))}
                </Form.Select>
                <Form.Control.Feedback type="invalid">

                Veuillez sélectionner une cagnotte
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    name="nom"
                    placeholder="Nom"
                    value={contributeur.nom}
                    onChange={(event) =>
                      handleChange({ ...contributeur, nom: event.target.value })
                    }
                    className="form-control"
                    required
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={contributeur.email}
                    onChange={(event) =>
                      handleChange({
                        ...contributeur,
                        email: event.target.value,
                      })
                    }
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez saisir une adresse email valide
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group>
                  <Form.Label>Montant</Form.Label>
                  <Form.Control
                    type="number"
                    name="montant"
                    placeholder="montant"
                    value={contributeur.montant}
                    onChange={(event) =>
                      handleChange({
                        ...contributeur,
                        montant: event.target.value,
                      })
                    }
                    className="form-control"
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    Veuillez saisir une adresse email valide
                  </Form.Control.Feedback>
                </Form.Group>
              </Row>
              <br />
              <div>
                <Button type="submit" className="btn btn-success">
                  Enregistrer
                </Button>
              </div>
            </fieldset>
            <br />
            {showNotif && (
              <Alert
                variant="success"
                dismissible
                onClose={() => setShowNotif(false)}
              >
                Enregistrement effectué
              </Alert>
            )}
            {showErreur && (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setShowErreur(false)}
              >
                Une erreur s'est produite lors de l'enregistrement du contributeur
              </Alert>
            )}
          </div>
          <MDBCol col="6">
            <img
              src="https://discover.sap.com/content/dam/digitalhub/digital-government/280238_600x600.jpg"
              className="w-100 rounded-4 shadow-6"
            />
          </MDBCol>
        </MDBRow>
      </Form>
    </MDBContainer>
  );
}

export default ParticiperCagnotte;



