import React, { useContext } from 'react';
import { MdGTranslate } from 'react-icons/md';
import LocaleContext from '../contexts/LocaleContext';

function ToggleLocale() {
  const { locale, toggleLocale } = useContext(LocaleContext);

  return (
    <button 
      onClick={toggleLocale} 
      className="toggle-btn" 
      title={locale === 'id' ? "Ganti ke Bahasa Inggris" : "Switch to Indonesian"}
      style={{ 
        width: 'auto', 
        borderRadius: '24px', 
        padding: '8px 12px',
        gap: '8px',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <MdGTranslate size={22} />
      <span style={{ fontSize: '14px', fontWeight: 'bold', textTransform: 'uppercase' }}>
        {locale === 'id' ? 'ID' : 'EN'}
      </span>
    </button>
  );
}

export default ToggleLocale;