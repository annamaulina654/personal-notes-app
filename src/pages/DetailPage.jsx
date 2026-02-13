import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils/local-data';
import NotFoundPage from './NotFoundPage';
import { MdOutlineArchive, MdOutlineUnarchive, MdDeleteOutline, MdArrowBack, MdOutlineCalendarToday } from 'react-icons/md';

function DetailPage({ notes, onDelete, onArchive, onUnarchive }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return <NotFoundPage />;
  }

  const handleDelete = () => {
    onDelete(id);
    navigate('/');
  };

  const handleArchive = () => {
    if (note.archived) {
      onUnarchive(id);
    } else {
      onArchive(id);
    }
  };

  return (
    <section className="detail-page">
      <div className="detail-page-header">
          <div>
             <button className="btn-icon" onClick={() => navigate(-1)} title="Kembali" style={{marginBottom: '1rem', width: '40px', height: '40px'}}>
                <MdArrowBack />
             </button>
             <h3 className="detail-page__title">{note.title}</h3>
             <p className="detail-page__date">
                <MdOutlineCalendarToday size={16}/>
                {showFormattedDate(note.createdAt)}
             </p>
          </div>
          
          <div className="action-buttons-container">
            <button className="btn-icon" onClick={handleArchive} title={note.archived ? "Aktifkan kembali" : "Arsipkan"}>
            {note.archived ? <MdOutlineUnarchive size={24} /> : <MdOutlineArchive size={24} />}
            </button>
            <button className="btn-icon danger" onClick={handleDelete} title="Hapus permanen">
                <MdDeleteOutline size={24} />
            </button>
        </div>
      </div>

      <div className="detail-page__body">{parser(note.body)}</div>
      
    </section>
  );
}

DetailPage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};

export default DetailPage;