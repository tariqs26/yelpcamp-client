import { Outlet } from "react-router-dom"
import Navbar from "../navbar"

export default function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}
