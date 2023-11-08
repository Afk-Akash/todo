import React, { useState } from 'react';
import { toast } from 'react-toastify';

function Register(props) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    let loginData = {
      email : email,
      password: password,
      name: name,
  }
    fetch("http://127.0.0.1:8080/api/register", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
            console.log(response)
          return response.json();
        })
        .then((data) => {
          let serverMessage = data.message;
          var responseCode = data.status;
          if(responseCode === 400){
              toast.error(serverMessage, {
                position: 'bottom-right', 
                autoClose: 3000, 
            });
            return
          }
          else{
              toast.success(serverMessage, {
                position: 'bottom-right', 
                autoClose: 3000, 
            });
          }
          console.log(data);
          props.setShowRegister(false)
          
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    console.log('Registration data:', { email, name, password });
  };

  return (
    <div className="container register-container">
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="textt"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{' '}
        <span onClick={() => props.onToggleLogin()}>Login</span>
      </p>
    </div>
  );
}

export default Register;
