import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { MdOutlineCalendarToday } from 'react-icons/md';
import { showFormattedDate } from '../utils/local-data';

function NoteItem({ id, title, body, createdAt }) {
  return (
    <Link to={`/notes/${id}`} className="note-item">
      <h3 className="note-item__title">{title}</h3>
      <p className="note-item__date">
        <MdOutlineCalendarToday size={14} />
        {showFormattedDate(createdAt)}
      </p>
      <div className="note-item__body">{parser(body)}</div>
    </Link>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default NoteItem;