import React, { useState } from 'react'
import Register from './Register'
import Login from './Login';
import './Authentication.css'

function Authentication(props) {
    const [showRegister, setShowRegister] = useState(true);

    const togglePage = () => {
      setShowRegister(!showRegister);
    };

  return (
    <div>
        {
            showRegister ? (
            <Register onToggleLogin={togglePage} 
            setShowRegister={setShowRegister}/>
        ) : (
            <Login onToggleRegister={togglePage} 
            setIsLogged={props.setIsLogged}/>
        )
      }

    </div>
  )
}

export default Authentication