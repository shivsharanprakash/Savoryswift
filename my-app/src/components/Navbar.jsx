import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge'
import Modal from '../pages/Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';

const Navbar = () => {
    const [cartview, setCartview] = useState(false)
    let data = useCart();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }
    return (
        <div className='container-fluid'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">SavorySwift</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto mb-2">
                            <li className="nav-item">
                                <Link className="nav-link active " aria-current="page" to="/">Home</Link>
                            </li>
                            {(localStorage.getItem('authToken')) ?
                              <li className="nav-item">
                                    <Link className="nav-link active " aria-current="page" to="/myorder">My Orders</Link>                                </li> : ""
                            }
                        </ul>
                        {(!localStorage.getItem('authToken')) ?
                            <div className='d-flex'>
                                <Link className="btn bg-white text-success mx-1  " to="/login">Login</Link>
                                <Link className="btn  bg-white text-success mx-1" to="/createuser">Signup</Link>
                            </div> :
                            <div className=''>
                                <div className='btn bg-white text-success mx-2' onClick={() => setCartview(true)}>My Cart {" "}
                                    <Badge pill bg='danger'>{data.length}</Badge>
                                </div>
                                {cartview ? <Modal onClose={() => setCartview(false)}><Cart /></Modal> : null}
                                <div className='btn bg-white text-danger mx-2 ' onClick={handleLogout}>Logout</div>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
