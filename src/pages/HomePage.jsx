import React, { useState, useEffect, useContext } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import NoteList from '../components/NoteList';
import SearchBar from '../components/SearchBar';
import Loading from '../components/Loading';
import { getActiveNotes } from '../utils/network-data';
import LocaleContext from '../contexts/LocaleContext';
import content from '../utils/content';
import { MdAdd } from 'react-icons/md';

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { locale } = useContext(LocaleContext);

  const keyword = searchParams.get('keyword') || '';

  useEffect(() => {
    getActiveNotes().then(({ data }) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const onKeywordChangeHandler = (keyword) => {
    setSearchParams({ keyword });
  };

  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(keyword.toLowerCase());
  });

  return (
    <section>
      {loading && <Loading />}
      <h2>{content[locale].home.title}</h2>
      <SearchBar keyword={keyword} keywordChange={onKeywordChangeHandler} />
      
      {filteredNotes.length > 0 ? (
        <NoteList notes={filteredNotes} />
      ) : (
        !loading && <p className="notes-list__empty-message">
          {content[locale].home.empty}
        </p>
      )}

      <div className="fab-container">
        <Link to="/notes/new" className="fab" title={content[locale].add.title}>
          <MdAdd />
        </Link>
      </div>
    </section>
  );
}

export default HomePage;