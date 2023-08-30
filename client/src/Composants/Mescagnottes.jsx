import React, { useState } from "react";
import { Card, Col, ProgressBar, Row, Button, Modal, Form, Alert } from 'react-bootstrap';
import useSWR, { mutate } from 'swr';
import Offcanvas from "react-bootstrap/Offcanvas";
import '../styles/style.css';
import ParticiperCagnotte from "./ParticiperCagnotte";
import { useAuth0 } from '@auth0/auth0-react';
import PermissionGuard from './PermissionGuard.jsx';

const CagnotteItem = ({ cagnotte, onDelete, onUpdate }) => {
  const progress = Math.floor((cagnotte.montantCollecte / cagnotte.montantObjectif) * 100);

  const [showModal, setShowModal] = useState(false);
  const [cagnotteSelected, setCagnotteSelected] = useState(false);
  const [afficheLogin, setAfficheLogin] = useState(false);
  const handleClose = () => setAfficheLogin(false);
  const handleShow = () => setAfficheLogin(true);
  const [updatedMontantObjectif, setUpdatedMontantObjectif] = useState(cagnotte.montantObjectif);
  
  const handleDelete = () => {
    // Effectuer la suppression de la cagnotte (appel à l'API, etc.)
    onDelete(cagnotte.id);
  };

  const handleUpdate = () => {
    // Effectuer la modification de la cagnotte (appel à l'API, etc.)
    onUpdate(cagnotte.id, updatedMontantObjectif);
    setShowModal(false);
  };
  
  return (
    <Col>
      <Card>
        <Card.Img variant="start" src={"https://th.bing.com/th/id/OIP.7SdvGlYZuQBj4xpd0CkubwHaE7?pid=ImgDet&rs=1"} alt="Image de la cagnotte" />
        <Card.Body>
          <Card.Title>{cagnotte.nom}</Card.Title>
          <Card.Text>{cagnotte.description}</Card.Text>
          <Card.Text>{cagnotte.montantCollecte}€ récolté sur {cagnotte.montantObjectif}€</Card.Text>
          <Card.Text> 👨‍👩‍👧‍👦: {cagnotte.contributeurs.length} participants </Card.Text>
          <ProgressBar  variant="success" now={progress} label={`${progress}%`} /><br />
          <div className="logNav">
                    
                    <div>
                      
                    <Offcanvas
                      show={afficheLogin}
                      onHide={handleClose}
                      placement="end"
                      className="w-75 p-6"
                    >
                      <Offcanvas.Body>
                        
                        <div>
                          <h4>selectionner la cagnotte de {cagnotteSelected.nom}</h4>
                        </div>
                        
                        <hr />
                        
                        <ParticiperCagnotte />
                        
                      </Offcanvas.Body>
                    </Offcanvas>
                  </div>
                  </div>
          
          <div className="buttonmodif">
          <Button
                      type="submit"
                      variant="success"
                      onClick={() => {
                        handleShow();
                        setCagnotteSelected(cagnotte);
                      }}
                    >
                      {" "}
                      participer{" "}
                    </Button>
          <Button variant="danger" onClick={handleDelete}>Supprimer</Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>Modifier</Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal pour la modification de la cagnotte */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier la cagnotte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formMontantObjectif">
            <Form.Label>Montant Objectif</Form.Label>
            <Form.Control type="number" value={updatedMontantObjectif} onChange={e => setUpdatedMontantObjectif(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleUpdate}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};



const MesCagnottes = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 4;

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

  
  const deleteCagnotte = async (id) => {
    // Effectuer la suppression de la cagnotte (appel à l'API, etc.)
    const accessToken = await getAccessTokenSilently();
    await fetch(`/api/cagnottes/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Rafraîchir
    // Rafraîchir la liste des cagnottes après la suppression
    mutate('/api/cagnottes');
  };
  
  const updateCagnotte = async (id, montantObjectif) => {
    // Effectuer la modification de la cagnotte (appel à l'API, etc.)
    
    const accessToken = await getAccessTokenSilently();
    await fetch(`/api/cagnottes/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ montantObjectif }),
    });
    // Rafraîchir la liste des cagnottes après la modification
    mutate('/api/cagnottes');
  };

  const { data: cagnottes, error } = useSWR(`/api/cagnottes?page=${currentPage}&size=${pageSize}`, fetcher);

  if (error) {
    return <div>Erreur lors de la récupération des cagnottes: {error.message}</div>;
  }

  if (!cagnottes) {
    return <div>Chargement en cours...</div>;
  }

  const handleDeleteCagnotte = (id) => {
    deleteCagnotte(id);
  };

  const handleUpdateCagnotte = (id, montantObjectif) => {
    updateCagnotte(id, montantObjectif);
  };

  return (
    <div className='card1 '>
      <h2>Liste des cagnottes</h2><br />
      
      <Row xs={1} md={2} className="g-4">
        {cagnottes.content.map((cagnotte) => (
          <CagnotteItem key={cagnotte.id} cagnotte={cagnotte} onDelete={handleDeleteCagnotte} onUpdate={handleUpdateCagnotte} />
        ))}
      </Row>
      
      {cagnottes.number > 0 && (
        <Button variant="link" onClick={() => setCurrentPage(cagnottes.number - 1)}>
          Précédent
        </Button>
      )}
      {cagnottes.hasOwnProperty('last') && !cagnottes.last && (
        <Button variant="link" onClick={() => setCurrentPage(cagnottes.number + 1)}>
          Suivant 
        </Button>
      )}<br /><br />
    </div>
  );
}
export default MesCagnottes;