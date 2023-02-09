import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import {
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from '@firebase/auth';
import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { signIn } from '../utils/signIn';

const Navbar = () => {
  const currentUser = useContext(AuthContext);
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-white bg-body-tertiary">
      <div className="container-fluid">
        <Link className='navbar-brand' to='/'>opendata-finance-kr</Link>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav me-auto'>
            <li className='navbar-item'><Link className='nav-link' to="/documentations">DOCUMENTATION</Link></li>
            <li className='navbar-item'><Link className='nav-link' to="/datasets">DATASETS</Link></li>
            <li className='navbar-item'><Link className='nav-link' to="/examples">EXAMPLES</Link></li>
          </ul>
          {
            currentUser && (
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => {signOut(auth)}}
              >Logout</button>
            )
          }
          {
            !currentUser && (
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => signIn()}
              >Login / Register with Google</button>
            )
          }
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
