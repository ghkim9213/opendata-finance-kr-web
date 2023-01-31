import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <>
      <nav className='navbar navbar-expand-lg bg-white'>
        <div className='container-fluid'>
          <Link className='navbar-brand' to='/'>opendata-finance-kr</Link>
          <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown' aria-controls='navbarNavDropdown' aria-expanded='false' aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              <li className='navbar-item'><Link className='nav-link' to="/apidoc">API</Link></li>
              <li className='navbar-item'><Link className='nav-link disabled' to="/examples">Examples</Link></li>
              <li className='navbar-item'><Link className='nav-link' to="/datasets">Datasets</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
