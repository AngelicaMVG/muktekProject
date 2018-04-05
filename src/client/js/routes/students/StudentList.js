import React, { Component, Fragment } from 'react';
import moduleName from '../../shared/grid/Section';
import req from 'superagent';
import Section from '../../shared/grid/Section';
import Box from '../../shared/box/Box';
import Button from '../../shared/button/Button';
import MyLink from '../../shared/link/MyLink';
import StudentListItem from './StudentListItem';
import { Redirect } from 'react-router-dom';

export default class StudentList extends Component {
  state = {
    students: []
  };

  componentDidMount() {
    this.getStudents();
  }

  getStudents = () => {
    req.get('/api/students').then(res => {
      this.setState({
        students: res.body
      });
    });
  };

  render() {
    if (this.props.isAuthenticated === false) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <Section>
          <h2>Estudiantes CIMI</h2>
          <Box justifyContent="flex-end">
            <Button
              bgColor="#2C308D"
              onClick={() => this.props.history.push('/students/new')}
            >
              Crear Estudiante
            </Button>
          </Box>
        </Section>
        {this.state.students.length && (
          <div>
            {this.state.students.map(student => (
              <MyLink to={`/students/${student.id}`} key={student.id}>
                <StudentListItem key={student.id} student={student} />
              </MyLink>
            ))}
          </div>
        )}
      </div>
    );
  }
}
