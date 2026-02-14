import React from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import ThemeContext from '../contexts/ThemeContext';

function ToggleTheme() {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <button onClick={toggleTheme} className="toggle-btn" title="Ubah Tema">
          {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
        </button>
      )}
    </ThemeContext.Consumer>
  );
}

export default ToggleTheme;