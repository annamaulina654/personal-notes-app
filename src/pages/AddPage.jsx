import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { MdCheck, MdArrowBack } from 'react-icons/md';

function AddPage({ onAdd }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onInputHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    onAdd({ title, body });
    navigate('/');
  };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
         <button className="btn-icon" onClick={() => navigate(-1)} title="Kembali" style={{width: '40px', height: '40px'}}>
            <MdArrowBack />
         </button>
         <h2 style={{margin: 0}}>Buat Catatan Baru</h2>
      </div>
      
      <form onSubmit={onSubmitHandler}>
        <div className="add-new-page__input">
          <input
            className="input"
            type="text"
            placeholder="Judul catatan di sini..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            autoFocus
          />
          <div
            className="add-new-page__input__body"
            data-placeholder="Tuliskan isi catatanmu di sini..."
            contentEditable
            onInput={onInputHandler}
            suppressContentEditableWarning={true}
          />
        </div>
        <div className="fab-container">
            <button type="submit" className="fab" title="Simpan Catatan">
                <MdCheck />
            </button>
        </div>
      </form>
    </section>
  );
}

AddPage.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

export default AddPage;