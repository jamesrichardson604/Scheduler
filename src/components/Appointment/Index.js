import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "hooks/useVisualMode";

import "components/Appointment/styles.scss";

const EMPTY = "EMPTY";
const SHOW = "SHOW";  
const CREATE = "CREATE";  
const SAVING = 'SAVING';
const DELETE = 'DELETING';
const CONFIRM = 'CONFIRM';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';
const confirmMsg = 'Are you sure you would like to delete?';
const errDeleteMsg = 'Could not cancel appointment';
const errSaveMsg = 'Could not book appointment';

export default function Appointment (props) {

  const {time, bookInterview, cancelInterview } = props

  const { mode, transition, back } = useVisualMode(props.interview ? SHOW : EMPTY);

  function onAdd(){
    transition(CREATE);
  }

  function onCancel(){
    back();
  }

  function onConfirm(){
    transition(CONFIRM);
  }

  function onEdit(){
    transition(EDIT);
  }

  function onDelete(){
    transition(DELETE, true)
    cancelInterview(props.id)
    .then(() => transition(EMPTY))
    .catch(err => transition(ERROR_DELETE, true))
  }

  function save(name, interviewer) {
    if (!interviewer) {
      console.log('caught')
      return
    }
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING)
    bookInterview(props.id, interview)
    .then(() => transition(SHOW))
    .catch(err => transition(ERROR_SAVE, true))
  }

  return (
    <article className="appointment"  data-testid="appointment">
      <Header time={time}/>
        {mode === EMPTY && <Empty onAdd={onAdd} />}
        {mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={onConfirm} 
            onEdit={onEdit}
          />
        )}
        {mode === CREATE && (
          <Form 
            interviewers={props.interviewers} 
            onCancel={onCancel} 
            onSave={save}
          />
        )}
        {mode === SAVING && <Status message='Saving' />}
        {mode === DELETE && <Status message='Deleting'/>}
        {mode === CONFIRM && 
          <Confirm 
            message={confirmMsg} 
            onCancel={onCancel} 
            onConfirm={onDelete} 
          />}
        {mode === EDIT && 
          <Form 
            student={props.interview.student} 
            interviewer={props.interview.interviewer.id} 
            interviewers={props.interviewers} 
            onCancel={onCancel} 
            onSave={save}
          />}
        {mode === ERROR_DELETE && 
          <Error 
            message={errDeleteMsg} 
            onCancel={onCancel}
          />}
        {mode === ERROR_SAVE && 
          <Error 
            message={errSaveMsg} 
            onCancel={onCancel}
          />}
    </article>
  )
}