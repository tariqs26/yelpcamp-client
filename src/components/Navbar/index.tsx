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
            <NavLink to='/campgrounds/new' className='nav-link'>
              New campground
            </NavLink>
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
                <NavLink
                  to='/login'
                  className='btn btn-outline-primary outline-2 text-light px-2 py-1'
                >
                  Login
                </NavLink>
                <NavLink
                  className='btn btn-outline-primary outline-2 text-light px-2 py-1'
                  to='/register'
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
