import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "react-bootstrap/Button";
import '../styles/style.css';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="menu">
    <Button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      log out
    </Button>
    </div>
  );
};

export default LogoutButton;