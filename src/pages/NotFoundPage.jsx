import React from 'react';
import { Link } from 'react-router-dom';
import { MdErrorOutline, MdHome } from 'react-icons/md';

function NotFoundPage() {
  return (
    <section className="not-found-container">
      <MdErrorOutline className="not-found-icon" style={{ fontSize: '100px', color: '#a0a0a6' }} />
      
      <h2 style={{ fontSize: '48px', margin: '20px 0 10px' }}>404</h2>
      <p style={{ fontSize: '18px', color: '#a0a0a6', marginBottom: '30px' }}>
        Oops! Halaman yang Anda kunjungi tidak ditemukan.
      </p>

      <Link 
        to="/" 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          textDecoration: 'none', 
          backgroundColor: 'var(--primary)', 
          color: 'white', 
          padding: '12px 24px', 
          borderRadius: '8px',
          fontWeight: 'bold'
        }}
      >
        <MdHome size={20} />
        Kembali ke Beranda
      </Link>
    </section>
  );
}

export default NotFoundPage;