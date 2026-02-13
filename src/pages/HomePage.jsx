import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import { MdAdd } from 'react-icons/md';

function HomePage({ notes }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return !note.archived && note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      <h2>Catatan Aktif</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      <NoteList notes={filteredNotes} emptyMessage="Tidak ada catatan aktif saat ini." />
      
      <div className="fab-container">
        <Link to="/notes/new" className="fab" title="Tambah Catatan Baru">
          <MdAdd />
        </Link>
      </div>
    </section>
  );
}

HomePage.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HomePage;