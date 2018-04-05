import React, { Component } from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'react-router-dom';
import req from 'superagent';
import logo from '../logo.png';

const Nav = glamorous.nav({
  backgroundColor: '#3A2192',
  height: 80,
  padding: '5px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'white'
});

const routesAuthenticated = [
  <NavLink to="/students" style={{ color: 'white', textDecoration: 'none' }}>
    Students
  </NavLink>
];

const routes = [<NavLink to={'/'}>Login</NavLink>];

export default class Navbar extends Component {
  logout = () => {
    req.get('/auth/logout').then(() => {
      console.log('logout!!!');
      this.props.updateNoAuthorization;
    });
  };
  render() {
    if (this.props.isAuthenticated) {
      return (
        <Nav>
          <img src={logo} alt="#" width={40} />
          <div
            style={{
              width: '20%',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <div>{routesAuthenticated}</div>

            <button
              className="nav__link"
              style={{
                with: '30',
                border: 'none',
                color: '#ccc',
                borderRadius: 0
              }}
              onClick={this.logout}
            >
              Logout
            </button>
          </div>
        </Nav>
      );
    } else {
      return (
        <Nav>
          <img src=" " alt="#" width={40} />
          <div
            style={{
              width: '20%',
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            <div>{routes}</div>
          </div>
        </Nav>
      );
    }
  }
}
