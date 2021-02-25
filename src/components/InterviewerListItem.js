import React from "react";
import classNames from "classnames";

import "styles/InterviewerListItem.scss";

export default function InterviewerListItem (props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected' : selected
  })
  return ( 
    <li className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt="Sylvia Palmer"
        onClick={setInterviewer}
      />
      {name}
    </li>
  )
}
