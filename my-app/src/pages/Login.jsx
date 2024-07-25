import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        })
      });

      const json = await response.json();
      console.log("Response from server:", json);

      if (!json.success) {
        alert("Enter Valid Credentials");
      } else {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('authToken', json.authToken);
        navigate('/');
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className='container'>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="p-4 border rounded">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  name='email'
                  placeholder='Enter your email here'
                  value={credentials.email}
                  className="form-control"
                  id="email"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input
                  type="password"
                  name='password'
                  placeholder='Enter your password'
                  value={credentials.password}
                  className="form-control"
                  id="password"
                  onChange={onChange}
                  required
                />
              </div>
              <button type="submit" className="m-3 btn btn-success">Submit</button>
              <Link to='/createuser' className='m-3 btn btn-danger'>Create Account</Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
