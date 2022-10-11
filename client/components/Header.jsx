import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaClipboardList } from 'react-icons/fa';
const Header = () => {
  return (
    <header className="container-lg w-100">
      <p className="text-center fs-5">What to do today?<FaClipboardList /></p>
    </header>
  );
};
export default Header;
