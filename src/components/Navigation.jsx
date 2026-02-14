import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdOutlineDescription, MdOutlineArchive } from 'react-icons/md';
import LocaleContext from '../contexts/LocaleContext';
import content from '../utils/content';

function Navigation() {
  const location = useLocation();
  const { locale } = useContext(LocaleContext);

  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <MdOutlineDescription size={20} />
            <span>{content[locale].nav.active}</span>
          </Link>
        </li>
        <li>
          <Link to="/archives" className={location.pathname === '/archives' ? 'active' : ''}>
            <MdOutlineArchive size={20} />
            <span>{content[locale].nav.archive}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;