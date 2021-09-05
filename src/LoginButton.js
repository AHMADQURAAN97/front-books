import React from 'react';
import { Button } from 'react-bootstrap';
import {useAuth0} from "@auth0/auth0-react";

function LoginButton() {

  const {isAuthenticated,loginWithRedirect} =useAuth0();

    /* TODO: Render a button with label 'Log In'. When the button is clicked then show LoginForm instead */
    return !isAuthenticated && (
    <Button onClick={loginWithRedirect}>Log in</Button>
     );
  
}
export default LoginButton;