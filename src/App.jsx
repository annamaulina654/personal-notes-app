import React, { useState, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ArchivePage from './pages/ArchivePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import NotFoundPage from './pages/NotFoundPage';
import { getAllNotes, addNote, deleteNote, archiveNote, unarchiveNote } from './utils/local-data';

function App() {
  const [notes, setNotes] = useState(() => getAllNotes());

  const refreshNotes = () => {
    setNotes(getAllNotes());
  };

  const onAddNoteHandler = ({ title, body }) => {
    addNote({ title, body });
    refreshNotes();
  };

  const onDeleteNoteHandler = (id) => {
    deleteNote(id);
    refreshNotes();
  };

  const onArchiveNoteHandler = (id) => {
    archiveNote(id);
    refreshNotes();
  };

  const onUnarchiveNoteHandler = (id) => {
    unarchiveNote(id);
    refreshNotes();
  };

  return (
    <div className="app-container">
      <header>
        <h1>Aplikasi Catatan</h1>
        <Navigation />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<HomePage notes={notes} />} />
          <Route path="/archives" element={<ArchivePage notes={notes} />} />
          <Route path="/notes/new" element={<AddPage onAdd={onAddNoteHandler} />} />
          <Route 
            path="/notes/:id" 
            element={
              <DetailPage 
                notes={notes} 
                onDelete={onDeleteNoteHandler}
                onArchive={onArchiveNoteHandler}
                onUnarchive={onUnarchiveNoteHandler}
              />
            } 
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;