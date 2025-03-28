import { NavLink } from "react-router-dom"
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap"
import { useAuth } from "../providers/auth"
import { useLogoutUser } from "./useLogout"

import "./index.css"

export const Navbar = () => {
  const { user } = useAuth()
  const { mutate, isPending } = useLogoutUser()

  const handleNavClick = () => {
    if (window.innerWidth < 992) {
      const toggle: HTMLButtonElement | null =
        document.querySelector(".navbar-toggler")
      if (toggle !== null) toggle.click()
    }
  }

  return (
    <BsNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="px-sm-5"
      fixed="top">
      <Container>
        <NavLink to="/" className="navbar-brand" onClick={handleNavClick}>
          YelpCamp
        </NavLink>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav>
            <NavLink to="/" className="nav-link" onClick={handleNavClick}>
              Home
            </NavLink>
            <NavLink
              to="/campgrounds"
              className="nav-link"
              onClick={handleNavClick}>
              Campgrounds
            </NavLink>
            <NavLink
              to="/new-campground"
              className="nav-link"
              onClick={handleNavClick}>
              New campground
            </NavLink>
          </Nav>
          <div className="nav-btns d-flex gap-3 align-items-center ms-auto mb-2 mb-lg-0 mt-3 mt-lg-0">
            {user ? (
              <button
                type="button"
                className="btn btn-secondary text-light px-2 py-1"
                onClick={() => {
                  mutate()
                  handleNavClick()
                }}
                disabled={isPending}>
                Sign out
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn-secondary text-light px-2 py-1"
                  onClick={handleNavClick}>
                  Sign in
                </NavLink>
                <NavLink
                  className="btn btn-primary text-light px-2 py-1"
                  to="/register"
                  onClick={handleNavClick}>
                  Register
                </NavLink>
              </>
            )}
          </div>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  )
}
