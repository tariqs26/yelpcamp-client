import { NavLink } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';
import useLogoutUser from 'hooks/user/useLogout';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Loader from 'components/SubmitLoader';
import './Navbar.css';

export default function NavbarComponent() {
  const { user } = useAuth();
  const { mutate, isLoading } = useLogoutUser();

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      const toggle = document.querySelector('.navbar-toggler') as HTMLElement;
      toggle.click();
    }
  };

  return (
    <Navbar
      bg='dark'
      variant='dark'
      expand='lg'
      className='px-sm-5 '
      sticky='top'
    >
      <Container fluid>
        <NavLink to='/' className='navbar-brand' onClick={handleNavClick}>
          YelpCamp
        </NavLink>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav>
            <NavLink to='/' className='nav-link' onClick={handleNavClick}>
              Home
            </NavLink>
            <NavLink
              to='/campgrounds'
              className='nav-link'
              onClick={handleNavClick}
            >
              Campgrounds
            </NavLink>
            <NavLink
              to='/new-campground'
              className='nav-link'
              onClick={handleNavClick}
            >
              New campground
            </NavLink>
          </Nav>
          <div className='nav-btns d-flex gap-3 align-items-center ms-auto mb-2 mb-lg-0 mt-3 mt-lg-0'>
            {user || isLoading ? (
              <Nav.Link
                className='btn btn-outline-secondary text-light px-2 py-1'
                style={{
                  minWidth: '4.7rem',
                }}
                onClick={() => {
                  mutate();
                  handleNavClick();
                }}
                disabled={isLoading}
              >
                <Loader text='Sign out' isLoading={isLoading} />
              </Nav.Link>
            ) : (
              <>
                <NavLink
                  to='/login'
                  className='btn btn-outline-secondary text-light px-2 py-1'
                  onClick={handleNavClick}
                >
                  Sign in
                </NavLink>
                <NavLink
                  className='btn btn-primary text-light px-2 py-1'
                  to='/register'
                  onClick={handleNavClick}
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
}
