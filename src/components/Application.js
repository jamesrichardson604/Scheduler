import React, { useState, Fragment, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment/Index";

import "styles/Application.scss";

const axios = require('axios');

const appointments = [
  {
    id: 1,
    time: "12pm",
  },
  {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer: {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  {
    id: 3,
    time: "2pm",
  },
  {
    id: 4,
    time: "3pm",
  },
  {
    id: 5,
    time: "4pm",
  },

];

export default function Application(props) {
  const [day, setDay] = useState("Monday")
  const [days, setDays] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then(response => {
      setDays(response.data) 
    })
    .catch(err => console.log(err))
  }, []);

  return (
    <main className="layout">
      <section className="sidebar">
              <img
        className="sidebar--centered"
        src="images/logo.png"
        alt="Interview Scheduler"
      />
      <hr className="sidebar__separator sidebar--centered" />
      <nav className="sidebar__menu">
        <DayList
          days={days}
          day={day}
          setDay={setDay}
        />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
      <Fragment>
        {appointments.map(appointment => {
          return (
            <Appointment key={appointment.id} {...appointment} />
          )
        })}
          <Appointment id="last" time="5pm" />
        </Fragment>
      </section>
    </main>
  );
}
