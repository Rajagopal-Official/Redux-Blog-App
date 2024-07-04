import { Outlet } from "react-router-dom";
import Header from './Header'
const Layout = () => {
  return (
     //Empty Component or Fragments
    <>
    <Header />
    <main className="App">
        <Outlet />
    </main>
    </>
  )
}

export default Layout