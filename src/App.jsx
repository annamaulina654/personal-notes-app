import React, { useState, useEffect, useMemo } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Navigation from './components/Navigation';
import ToggleTheme from './components/ToggleTheme';
import ToggleLocale from './components/ToggleLocale'; 

import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LocaleProvider } from './contexts/LocaleContext';

import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [locale, setLocale] = useState(localStorage.getItem('locale') || 'id');

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  const toggleLocale = () => {
    setLocale((prevLocale) => {
      const newLocale = prevLocale === 'id' ? 'en' : 'id';
      localStorage.setItem('locale', newLocale);
      return newLocale;
    });
  };

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);
  const localeContextValue = useMemo(() => ({ locale, toggleLocale }), [locale]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    getUserLogged().then(({ data }) => {
      setAuthedUser(data);
      setInitializing(false);
    });
  }, []);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  if (initializing) {
    return null; 
  }

  return (
    <ThemeProvider value={themeContextValue}>
      <LocaleProvider value={localeContextValue}>
        <div className="app-container">
          <header>
            <h1>
              <Link to="/">
                {locale === 'id' ? 'Aplikasi Catatan' : 'Notes App'}
              </Link>
            </h1>
            
            <div className="toggle-container">
               <ToggleLocale />
               
               <ToggleTheme />
               
               {authedUser && (
                 <button onClick={onLogout} className="toggle-btn" style={{fontSize: '16px', borderRadius: '8px', width: 'auto', padding: '0 12px'}}>
                   Logout
                 </button>
               )}
            </div>
          </header>
          <main>
            {authedUser === null ? (
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            ) : (
              <>
                 <Navigation />
                 <br/>
                 <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/archives" element={<ArchivePage />} />
                  <Route path="/notes/new" element={<AddPage />} />
                  <Route path="/notes/:id" element={<DetailPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </>
            )}
          </main>
        </div>
      </LocaleProvider>
    </ThemeProvider>
  );
}

export default App;