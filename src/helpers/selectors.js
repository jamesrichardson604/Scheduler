export function getAppointmentsForDay(state, day) {
  const filtered = state.days.filter(dayObj => dayObj.name === day)
  if (filtered.length === 0) {
    return []
  }
  const appointments = Object.values(state.appointments)
  let appointmentsArr = []
  filtered.forEach(dayObj => {
    if (dayObj.appointments.length === 0) {
      return []
    }
    for (let appObj of appointments) {
      if (dayObj.appointments.includes(appObj.id)) {
        appointmentsArr.push(appObj)
      }
    }
  })
  return appointmentsArr
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  let interviewObj = {};
  interviewObj.student = interview.student;
  const interviewerID = interview.interviewer;
  const interviewers = Object.values(state.interviewers);
  for (let intObj of interviewers){
    if (intObj.id === interviewerID){
      interviewObj.interviewer = intObj;
    }
  }
  return interviewObj;
}

export function getInterviewersForDay(state, day) {

  const filtered = state.days.filter(dayObj => dayObj.name === day)

  if (filtered.length === 0) {
    return []
  } 
  const interviewers = Object.values(state.interviewers)
  const interviewerIDArr = filtered[0].interviewers;
 
  if (interviewerIDArr.length === 0) {
    return []
  }
  let interviewersArr = []
  for (let i in interviewers) {
    if (interviewerIDArr.includes(interviewers[i].id)) {
      interviewersArr.push(interviewers[i])
    }
  }
  return interviewersArr
}