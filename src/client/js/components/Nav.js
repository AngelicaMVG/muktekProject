import React, { Component } from 'react';
import glamorous from 'glamorous';
import { NavLink } from 'react-router-dom';
import req from 'superagent';
import logo from '../logo.png';

const Nav = glamorous.nav({
  backgroundColor: '#564A9B',
  height: 80,
  padding: '5px 20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: 'white',
  zIndex: 50
});

export default class Navbar extends Component {
  getRoute = () => {
    if (localStorage.getItem('email')) {
      return [
        <NavLink
          key="1"
          to="/students"
          style={{ color: 'white', textDecoration: 'none' }}
        >
          Students
        </NavLink>,
        <a
          style={{
            textDecoration: 'none',
            color: '#fff',
            marginLeft: '25%'
          }}
          href="/"
          key="2"
          onClick={this.logout}
        >
          Logout
        </a>
      ];
    }
  };
  logout = () => {
    req.get('/auth/logout').then(() => {
      console.log('logout!!!');
      this.props.updateNoAuthorization;
      console.log(this.props.isAuthenticated);
      localStorage.removeItem('email');
    });
  };
  render() {
    return (
      <Nav>
        <img src={logo} alt="#" width={40} />

        <div
          style={{
            width: '15%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div>{this.getRoute()}</div>
        </div>
      </Nav>
    );
  }
}
