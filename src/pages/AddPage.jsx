import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import useInput from '../hooks/useInput';
import LocaleContext from '../contexts/LocaleContext';
import content from '../utils/content';
import { MdArrowBack, MdCheck } from 'react-icons/md';

function AddPage() {
  const navigate = useNavigate();
  const { locale } = useContext(LocaleContext);
  const [title, onTitleChange] = useInput('');
  const [body, setBody] = React.useState('');

  const onInputBodyHandler = (event) => {
    setBody(event.target.innerHTML);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    await addNote({ title, body });
    navigate('/');
  };

  return (
    <section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
         <button className="btn-icon" onClick={() => navigate(-1)} title={content[locale].detail.back}>
            <MdArrowBack />
         </button>
         <h2 style={{margin: 0}}>{content[locale].add.title}</h2>
      </div>
      
      <form onSubmit={onSubmitHandler}>
        <div className="add-new-page__input">
          <input
            className="input"
            type="text"
            placeholder={content[locale].add.titlePlaceholder}
            value={title}
            onChange={onTitleChange}
            required
            autoFocus
          />
          <div
            className="add-new-page__input__body"
            data-placeholder={content[locale].add.bodyPlaceholder}
            contentEditable
            onInput={onInputBodyHandler}
            suppressContentEditableWarning={true}
          />
        </div>
        <div className="fab-container">
            <button type="submit" className="fab" title={content[locale].add.save}>
                <MdCheck />
            </button>
        </div>
      </form>
    </section>
  );
}

export default AddPage;