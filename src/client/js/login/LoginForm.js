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
  state = { email: '', password: '' };

  handleSubmit = e => {
    e.preventDefault();

    this.props.handleAuthentication({
      email: this.state.email,
      password: this.state.password
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  // onSubmit = e => {
  //   e.preventDefault();
  //   req
  //     .post('/auth/login')
  //     .send({ email: this.state.email, password: this.state.password })
  //     .then(res => {
  //       localStorage.setItem('user', res.body.email);
  //       console.log(res.body.email);
  //       if (res.body.email) {
  //         this.props.history.push('/students');
  //       }
  //     });
  // };

  render() {
    if (this.props.isAuthenticated === true) {
      return <Redirect to="/students" />;
    } else {
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
}

export default LoginForm;
