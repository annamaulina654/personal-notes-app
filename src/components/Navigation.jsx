import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDescription, MdOutlineArchive } from 'react-icons/md';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <MdOutlineDescription size={20} />
            <span>Catatan Aktif</span>
          </Link>
        </li>
        <li>
          <Link to="/archives" className={location.pathname === '/archives' ? 'active' : ''}>
            <MdOutlineArchive size={20} />
            <span>Arsip</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;