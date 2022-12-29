import React, { useState } from 'react';

const initialState = {
    password: '',
    email: ''
    }
    
    const LogIn = () => {
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
            <h2>iniciar sesion</h2>
            <form onClick={handleSubmit}>
                <input type='email' name='email' placeholder='email' value={form.email} onChange={handleChange}/>
                <input type='password' name='password' placeholder='contrasena' value={form.password} onChange={handleChange}/>
                <button type='submit'>inicia sesion</button>
            </form>
        </div>
      )
    }

export default LogIn
