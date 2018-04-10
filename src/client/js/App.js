import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/Nav';
import Error from './shared/Error';
import Grid from './shared/grid/Grid';
import Area from './shared/grid/Area';
import LoginForm from './login/LoginForm';
import StudentList from './routes/students/StudentList';
import StudentNew from './routes/students/StudentNew';
import StudentDetail from './routes/students/StudentDetail';
import WeekDetail from './routes/weeks/WeekDetail';
import request from 'superagent';
import 'normalize.css';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      isAuthenticated: false
    };
  }

  handleLogout = () => {
    request.get('/auth/current').then(currentUser => {
      // console.log(currentUser);
      this.setState({
        isAuthenticated: currentUser.body.id ? true : false
      });
    });
  };

  updateNoAuthorization() {
    this.setState({
      isAuthenticated: false
    });
  }

  componentWillMount() {
    this.handleLogout();
  }

  handleAuthentication = credentials => {
    // console.log(credentials);
    request
      .post('/auth/login')
      // .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: credentials.email,
        password: credentials.password
      })
      .then(userLogged => {
        this.setState({
          isAuthenticated: userLogged.body.id ? true : false
        });
      });
  };

  render() {
    return (
      <div style={{ fontFamily: 'Helvetica' }}>
        <Error>
          <Router>
            <Grid
              height="100%"
              gap="20px"
              template={`" top top top top" 50px ".  content content ." auto`}
            >
              <Area area="top">
                <Navbar
                  isAuthenticated={this.state.isAuthenticated}
                  updateNoAuthorization={this.updateNoAuthorization}
                />
              </Area>
              <Area area="content">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={props => (
                      <LoginForm
                        {...props}
                        isAuthenticated={this.state.isAuthenticated}
                        handleAuthentication={this.handleAuthentication}
                      />
                    )}
                  />
                  <Route
                    path="/students/:studentId/weeks/:id"
                    component={WeekDetail}
                  />
                  <Route path="/students/new" component={StudentNew} />
                  <Route
                    path="/students/:id"
                    render={props => (
                      <StudentDetail
                        {...props}
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />

                  <Route
                    path="/students"
                    render={props => (
                      <StudentList
                        isAuthenticated={this.state.isAuthenticated}
                      />
                    )}
                  />
                </Switch>
              </Area>
            </Grid>
          </Router>
        </Error>
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('app-container')
);
