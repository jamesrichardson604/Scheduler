import { useState } from 'react';

export default function useVisualMode(initial) {
  const [ mode, setMode ] = useState(initial);
  const [ history, setHistory ] = useState([initial]);
  
  function transition(mode, replace = false) {
    setMode(mode)
    if (replace) {
      setHistory(history)
    } else {
      setHistory([...history, mode])
    }
  }

  function back() { 
    let prevHistArr = history.slice(0, -1)
    let prevMode = prevHistArr.slice(-1)[0]
    setHistory(prevHistArr)
    if (history.length > 1) {
      setMode(prevMode)
    }
  }

  return { mode, transition, back };
}