import React, { useState } from 'react';
import { toast } from 'react-toastify';


function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Handle login logic here
    let loginData = {
        email : email,
        password: password,
    }
    
    fetch("http://127.0.0.1:8080/api/login", {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      })
        .then((response) => {
            console.log(response)
            if(response.status === 400){
                return
            }
          return response.json();
        })
        .then((data) => {
            toast.success(data.message, {
                position: 'bottom-right', 
                autoClose: 3000, 
            });
          console.log(data);
          props.setIsLogged(true)
          const token = data.token
          localStorage.setItem('jwt', token);
          document.cookie = `jwtToken=${token}; expires=${new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toUTCString()};
           path=/; domain=127.0.0.1; secure;`;
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error);
        });
    console.log('Login data:', { email, password });
  };

  return (
    <div className="container login-container">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account?{' '}
        <span onClick={() => props.onToggleRegister()}>Register</span>
      </p>
    </div>
  );
}

export default Login;
