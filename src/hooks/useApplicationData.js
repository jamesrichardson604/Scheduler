import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments : {},
    interviewers: {}
  });

  const setDay = day => {
    setState({ ...state, day: day.name })
  };

  useEffect(() => {
    const days = axios.get('http://localhost:8001/api/days');
    const appointments = axios.get('http://localhost:8001/api/appointments');
    const interviewers = axios.get('http://localhost:8001/api/interviewers');
    Promise.all([days, appointments, interviewers])
    .then(all => {
      setState(prev => ({...prev, days: all[0].data, interviewers: all[2].data, appointments: all[1].data}))
    })
    .catch(err => console.log(err))
  }, []);

  function bookInterview(id, interview) {
    
   const days = updateSpotsRemaining(id, true)

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
    .then(() =>  setState({...state, interview, appointments, days}))
    .catch(err => console.log(err))
  }

  function cancelInterview(id) {

    const days = updateSpotsRemaining(id, false)


    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`)
    .then(() => setState({...state, id, appointments, interview: null, days}))
    .catch(err => console.log(err))

  }

  function updateSpotsRemaining(id, decrement) {
    const dayOfAppt = state.days.filter(day => day.appointments.includes(id))
    const dayOfApptId = dayOfAppt[0].id;
    const dayOfApptObj = state.days[dayOfApptId - 1]
    let numSpots = dayOfApptObj.spots
   
    if (decrement && state.appointments[id].interview === null) {
      numSpots --
    } else if (!decrement) {
      numSpots ++
    }

    return state.days.map(day => {
      if (day.id !== dayOfApptId) {
        return day
      } 
      if (day.id === dayOfApptId) {
        return {
          ...day, 
          spots: numSpots
        }
      }
    })
  }

  return {state, setDay, bookInterview, cancelInterview};
}