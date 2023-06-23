import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [loggedInUser, setLoggedInUser] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/api/v1/login', user);
      console.log(response.data);
      setLoggedInUser(response.data.user.name);
    } catch (error) {
      console.error(error);
    }
  };
if(loggedInUser){
  return(<>
  <p>Welcome, {loggedInUser}!</p>
  </>)
}
else{
  return (
    <div>
      <h1>Login</h1>
      
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account! Sign up <a href="/register">here</a> </p>
    </div>
  );
}
  
}

export default Login;
