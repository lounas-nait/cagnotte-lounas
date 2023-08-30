import '../styles/style.css';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import React, { useState } from "react";
import MonAcceuil from './Acceuil';
import MesCagnottes from './Mescagnottes';
import MonContact from './Contact';
import CreerCagnotte from './CreerCagnotte';
import ParticiperCagnotte from './ParticiperCagnotte';
import LogoutButton from './LogOut';



function MonMenu() {
  const [afficheMenu, setAfficheMenu] = useState("Acceuil");
  const menuItem2 = ["Acceuil", "Cagnottes", "Contact"];
  const menuItem1 = ["Créer une cagnotte", "Participer"];

  return (
    <>
      <Navbar
        collapseOnSelect
        expand="lg"
        variant="dark"
        className="header"
      >
        <Container fluid>
          <Navbar.Brand href="/">
            <div className="headerTitre">
              <h2> HopeFund </h2>
            </div>
          </Navbar.Brand>
          <Navbar aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {menuItem2.map((item2) => (
                <Nav.Link key={item2} onClick={() => setAfficheMenu(item2)}>
                  {item2}
                </Nav.Link>
              ))}
              <Form className="d-flex">
                
                
              </Form>
            </Nav>
            <div className="menu">
              {menuItem1.map((item1) => (
                <Button
                  type="submit"
                  key={item1}
                  onClick={() => setAfficheMenu(item1)}
                >
                  {item1}
                </Button>
              ))}
            </div>
            <LogoutButton />
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {afficheMenu === "Acceuil" && <MonAcceuil />}
      {afficheMenu === "Cagnottes" && <MesCagnottes />}
      {afficheMenu === "Contact" && <MonContact />}
      {afficheMenu === "Créer une cagnotte" && <CreerCagnotte />}
      {afficheMenu === "Participer" && <ParticiperCagnotte />}
    </>
  );
}

export default MonMenu;
