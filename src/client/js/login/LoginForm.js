import React, { Component } from 'react';
import req from 'superagent';
import { withRouter, Redirect } from 'react-router-dom';
import Button from '../shared/button/Button';
import glamorous from 'glamorous';
import request from 'superagent';

const FieldWrapper = glamorous.input({
  boxSizing: 'border-box',
  width: '60%',
  display: 'block',
  height: 40,
  outline: 'none',
  border: `1px solid gray`,
  borderRadius: 4,
  marginBottom: 20,
  marginLeft: '20%',
  padding: '10px',
  ':focus': {
    border: `1px solid black`,
    boxShadow: `0px 0px 10px -2x§px black`
  }
});

const Card = glamorous.div(
  {
    margin: '10% auto',
    borderRadius: 4,
    padding: 50
  },
  ({ color }) => ({
    backgroundColor: 'white'
  })
);

const Title = glamorous.h1({
  fontFamily: 'Lato',
  textAlign: 'center',
  paddingBottom: 20
});

class LoginForm extends Component {
  state = { email: '', password: '', role: '' };

  handleSubmit = e => {
    e.preventDefault();

    request
      .post('/auth/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({ email: this.state.email, password: this.state.password })
      .then(userLogged => {
        localStorage.setItem('email', this.state.email);
        this.setState({
          isAuthenticated: userLogged.body.id ? true : false
        });
        this.props.history.push('/students');
      });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Card>
        <Title>Bienvenido a Muktek Academy</Title>
        <form onSubmit={this.handleSubmit}>
          <FieldWrapper
            type="email"
            placeholder="email"
            onChange={this.onChange}
            name="email"
            ref="email"
            value={this.state.email}
          />
          <FieldWrapper
            placeholder="Password"
            type="password"
            onChange={this.onChange}
            name="password"
            ref="password"
            value={this.state.password}
          />

          <Button style={{ backgroundColor: '#3A2192', marginLeft: '45%' }}>
            Login
          </Button>
        </form>
      </Card>
    );
  }
}

export default LoginForm;
