import React from 'react';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import BestBooks from "./BestBooks";
import Login from "./Login";
import Profile from "./Profile";

class App extends React.Component {

  

  render() {
    const {isAuthenticated} = this.props.auth0;
    return (
      <>
        <Router>
          <Header/>
          <Switch>
            <Route exact path="/">
              {/* TODO: if the user is logged in, render the `BestBooks` component, if they are not, render the `Login` component */}

                  { (isAuthenticated) ? <BestBooks/> : <Login/> }

            </Route>
            {/* TODO: add a route with a path of '/profile' that renders a `Profile` component */}
           
            <Route exact path="/profile">
              <Profile/>
            </Route>
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default withAuth0(App);;
