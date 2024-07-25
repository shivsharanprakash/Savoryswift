import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='container'>
            <footer className="py-5">
                <div className="row">
                    <div className="col-6 col-md-3">
                        <h5>Section 1</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/features" className="nav-link p-0 text-muted">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/pricing" className="nav-link p-0 text-muted">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="/faqs" className="nav-link p-0 text-muted">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-6 col-md-3">
                        <h5>Section 2</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-muted">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="/features" className="nav-link p-0 text-muted">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="/pricing" className="nav-link p-0 text-muted">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="/faqs" className="nav-link p-0 text-muted">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="/about" className="nav-link p-0 text-muted">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-12 col-md-4">
                        <h5>Subscribe to our newsletter</h5>
                        <p>Monthly digest of what's new and exciting from us.</p>
                        <form>
                            <div className="d-flex gap-2">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                                <button className="btn btn-primary" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-between py-4 my-4 border-top">
                    <p>© 2024 SavorySwift Company, Inc. All rights reserved.</p>
                    <ul className="list-unstyled d-flex">
                        {/* Additional links or social media icons can be added here */}
                    </ul>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
