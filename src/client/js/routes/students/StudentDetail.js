import React, { Component, Fragment } from 'react';
import { Div } from 'glamorous';
// import { Box } from '../../shared';
import WeekList from '../weeks/WeekList';
import req from 'superagent';
import glamorous from 'glamorous';

const CardDetail = glamorous.div(
  {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 50,
    borderRadius: 4,
    height: '200px',
    padding: 20,
    textAlign: 'center',
    alignItems: 'center'
  },
  ({ color }) => ({
    backgroundColor: '#ccc'
  })
);

class StudentDetail extends Component {
  state = {
    student: {}
  };

  componentDidMount() {
    req.get(`/api/students/${this.props.match.params.id}`).then(res => {
      this.setState({
        student: res.body
      });
    });
  }

  render() {
    const { student } = this.state;
    return (
      <div>
        {/* <Section padding="20px 0">
          <Box justifyContent="flex-end" marginBottom={40}>
            <Button bgColor="#2C308D">Crear Estudiante</Button>
          </Box>
        </Section> */}
        <Div marginBottom={50}>
          <CardDetail>
            <img alt="student" src={student.avatar} width={70} height={70} />
            <h2>
              {student.name} {student.lastName}
            </h2>
          </CardDetail>
        </Div>

        <WeekList weeks={student.weeks} />
      </div>
    );
  }
}

export default StudentDetail;
