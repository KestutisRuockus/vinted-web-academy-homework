import { useState } from "react";
import { navLinks } from "../../constants/navLinks";
import "./navbar.css";

const HamburgerIconComponent = () => {
  return (
    <svg
      className="hamburger-icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 6h18M3 12h18m-18 6h18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const CloseIconComponent = () => {
  return (
    <svg
      className="close-icon"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <img
        src="https://images.pexels.com/lib/api/pexels-white.png"
        alt="Pexels logo"
        width={72}
      />
      <ul className={open ? "open" : ""}>
        {navLinks.map((navLink) => (
          <li key={navLink.name}>{navLink.name}</li>
        ))}
      </ul>
      <div className="icons" onClick={() => setOpen(!open)}>
        {open ? <CloseIconComponent /> : <HamburgerIconComponent />}
      </div>
    </nav>
  );
};

export default Navbar;
