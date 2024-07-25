import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" });
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3001/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credentials.name,
                email: credentials.email,
                password: credentials.password,
                location: credentials.geolocation
            })
        });
        const json = await response.json();
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials");
        } else {
            alert("Account Created Successfully");
            navigate('/login');
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className='container border'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            placeholder='Enter your name'
                            name='name'
                            value={credentials.name}
                            className="form-control"
                            id="name"
                            onChange={onChange}
                            required
                        />
                    </div>
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
                    <div className="mb-3">
                        <label htmlFor="geolocation" className="form-label">Address</label>
                        <input
                            type="text"
                            placeholder='Enter your address'
                            name='geolocation'
                            value={credentials.geolocation}
                            className="form-control"
                            id="geolocation"
                            onChange={onChange}
                            required
                        />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to='/login' className='m-3 btn btn-danger'>Already a user?</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
