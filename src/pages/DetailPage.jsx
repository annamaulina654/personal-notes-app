import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import parser from 'html-react-parser';
import { getNote, deleteNote, archiveNote, unarchiveNote } from '../utils/network-data';
import { showFormattedDate } from '../utils/index';
import Loading from '../components/Loading';
import { MdOutlineArchive, MdOutlineUnarchive, MdDeleteOutline, MdArrowBack, MdAccessTime } from 'react-icons/md';

function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNote(id).then(({ data }) => {
      setNote(data);
      setLoading(false);
    });
  }, [id]);

  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    navigate('/');
  };

  const onArchiveHandler = async (id) => {
    await archiveNote(id);
    navigate('/');
  };

  const onUnarchiveHandler = async (id) => {
    await unarchiveNote(id);
    navigate('/');
  };

  if (loading) return <Loading />;
  if (!note) return <p>Catatan tidak ditemukan!</p>;

  return (
    <section className="detail-page">
      
      <div className="detail-page__controls">
        <button className="btn-icon" onClick={() => navigate(-1)} title="Kembali">
           <MdArrowBack size={24}/>
        </button>

        <div className="action-btn-group">
            <button 
                className="btn-icon" 
                onClick={() => note.archived ? onUnarchiveHandler(id) : onArchiveHandler(id)}
                title={note.archived ? "Aktifkan" : "Arsipkan"}
            >
                {note.archived ? <MdOutlineUnarchive size={24} /> : <MdOutlineArchive size={24} />}
            </button>
            <button 
                className="btn-icon danger" 
                onClick={() => onDeleteHandler(id)} 
                title="Hapus"
            >
                <MdDeleteOutline size={24} />
            </button>
        </div>
      </div>

      <div className="detail-page__header">
        <h1 className="detail-page__title">{note.title}</h1>
        <div className="detail-page__date">
            <MdAccessTime />
            {showFormattedDate(note.createdAt)}
        </div>
      </div>
      
      <div className="detail-page__body">{parser(note.body)}</div>
      
    </section>
  );
}

export default DetailPage;