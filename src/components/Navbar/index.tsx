import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useLogoutUser from 'hooks/user/useLogout';

const NavbarComponent = () => {
  const { user } = useAuth();
  const { mutate, isLoading } = useLogoutUser();

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      className='px-sm-5 '
      sticky='top'
    >
      <Container fluid>
        <Navbar.Brand href='/'>YelpCamp</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <NavLink to='/' className='nav-link'>
              Home
            </NavLink>
            <NavLink end to='/campgrounds' className='nav-link'>
              Campgrounds
            </NavLink>
            {user && (
              <NavLink to='/campgrounds/new' className='nav-link'>
                Add campground
              </NavLink>
            )}
          </Nav>
          <div className='d-flex gap-2 align-items-center  ms-auto'>
            {user || isLoading ? (
              <Nav.Link
                className='btn btn-outline-primary outline-2 text-light px-2 py-1'
                onClick={() => mutate()}
                disabled={isLoading}
              >
                {isLoading ? 'Logging out...' : 'Logout'}
              </Nav.Link>
            ) : (
              <>
                <Nav.Link
                  href='/login'
                  className='btn btn-outline-primary outline-2 text-light px-2 py-1'
                >
                  Login
                </Nav.Link>
                <Nav.Link
                  className='btn btn-primary text-light px-2 py-1'
                  href='/register'
                >
                  Register
                </Nav.Link>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
