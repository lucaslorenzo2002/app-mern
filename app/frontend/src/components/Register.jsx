import React, { useState, useEffect } from 'react';

const initialState = {
password: '',
email: ''
}

const Register = () => {
    const [form, setForm] =  useState(initialState);

    const handleChange = (e) => {
      setForm({
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = (e) => {
      e.preventDefault()
    }

  return (
    <div>
        <h2>registrate</h2>
        <form onClick={handleSubmit}>
            <input type='email' name='email' placeholder='email' value={form.email} onChange={handleChange}/>
            <input type='password' name='password' placeholder='contrasena' value={form.password} onChange={handleChange}/>
            <button type='submit'>registrate</button>
        </form>
    </div>
  )
}

export default Register
