import Navbar from './Navbar'
import NavbarMobile from './NavbarMobile'

export default function Header() {

  return (
    <header className="d-flex justify-content-between align-items-center p-3">
      <div className="header__logo">
          ELLE CONCEPT.
      </div>
      <NavbarMobile />
      <Navbar />
    </header>
  );
}
