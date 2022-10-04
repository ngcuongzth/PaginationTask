import React from 'react'
import { createContext, useReducer } from 'react';
import reducer, { initState } from './reducer';
const GlobalContext = createContext(null)


const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState)

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  )

}

export default GlobalProvider;
export { GlobalContext }
