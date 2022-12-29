import React from 'react'
import { useState } from 'react'
import LogIn from '../components/LogIn'
import Register from '../components/Register'

const SignUpScreen = () => {

  const [register, setRegister] = useState(false)

  const handleClick = () => {
    setRegister(!register)
  }

  return (
    <div>
        {
        register 
        ? <Register /> 
        : <LogIn />
        }
        {register ? <h5>Tienes cuenta? <button onClick={handleClick}>inicia sesion</button></h5> : <h5>No tienes cuenta? <button onClick={handleClick}>registrate</button></h5>}
    </div>
  )
}

export default SignUpScreen
