import React, { Component, Fragment } from 'react';
import { Div } from 'glamorous';
import { Redirect } from 'react-router-dom';
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
    student: {},
    weeks: [],
    homework: [],
    attendance: []
  };

  componentDidMount() {
    req.get(`/api/students/${this.props.match.params.id}`).then(res => {
      this.setState({
        student: res.body,
        weeks: res.body.weeks,
        homework: res.body.weeks.map(week =>
          week.days.map(day => day.homework)
        ),
        attendance: res.body.weeks.map(week =>
          week.days.map(day => day.attendance)
        )
      });
    });
  }

  getHomeworkPercentage = () => {
    if (this.state.homework.length) {
      return (
        (
          this.state.homework
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => a + b) *
          100 /
          75
        ).toFixed(2) + '%'
      );
    }
  };

  getAttendancePercentage = () => {
    if (this.state.attendance.length) {
      return (
        (
          this.state.attendance
            .reduce((a, b) => a.concat(b))
            .reduce((a, b) => a + b) *
          100 /
          75
        ).toFixed(2) + '%'
      );
    }
  };

  render() {
    console.log(this.state.homework);
    const { student } = this.state;
    return (
      <div>
        <Div marginBottom={50}>
          <CardDetail>
            <img alt="student" src={student.avatar} width={70} height={70} />
            <h2>
              {student.name} {student.lastName}
            </h2>
            <div>
              <h3>{this.getHomeworkPercentage()}</h3> <span>Tareas</span>
            </div>
            <div>
              <h3>{this.getAttendancePercentage()}</h3> <span>Asistencias</span>
            </div>
          </CardDetail>
        </Div>

        <WeekList weeks={student.weeks} />
      </div>
    );
  }
}

export default StudentDetail;
