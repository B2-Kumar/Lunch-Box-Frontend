import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import Modal from '../Modal';
import Cart from '../screens/Cart';
import { useCart } from './ContextReducer';

function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [fixedNavbar, setFixedNavbar] = useState(true);
  let data = useCart();
  let noOfItems = data.length;
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleCartClick = () => {
    setCartView(true);
    setFixedNavbar(false);
  };

  const handleCartCloseClick = () => {
    setCartView(false);
    setFixedNavbar(true);
  };

  const isLoginPage = window.location.pathname === '/login';
  const isSignupPage = window.location.pathname === '/creatuser';

  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-dark bg-success ${fixedNavbar && isLoginPage === false && isSignupPage === false ? 'fixed-top' : ''}`}>
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic" to="/">
            Lunch Box
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authToken') ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/myOrder">
                    My Orders
                  </Link>
                </li>
              ) : (
                ''
              )}
            </ul>
            {!localStorage.getItem('authToken') ? (
              <div className="d-flex">
                <Link className="btn bg-white text-success mx-1" to="/login">
                  Login
                </Link>
                <Link className="btn bg-white text-success mx-1" to="/creatuser">
                  SignUp
                </Link>
              </div>
            ) : (
              <div>
                <div className="btn bg-white text-success mx-2" onClick={handleCartClick}>
                  My Cart{' '}
                  {noOfItems === 0 ? '' : <Badge pill bg="danger">
                    {' '}
                    {noOfItems}{' '}
                  </Badge>}
                </div>
                {cartView ? (
                  <Modal onClose={handleCartCloseClick}>
                    {' '}
                    <Cart />{' '}
                  </Modal>
                ) : null}
                <div className="btn bg-white text-danger mx-2" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
