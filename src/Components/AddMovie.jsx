import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddMovie = () => {    
  const [name, setName] = useState('');
  const [yearOfRelease, setYearOfRelease] = useState('');
  const [plot, setPlot] = useState('');
  const [poster, setPoster] = useState('');
  const [producerName, setProducerName] = useState('');
  const [newActorName, setNewActorName] = useState('');
  const [actorNamesInput, setActorNamesInput] = useState('');
  const [availableActors, setAvailableActors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchActors();
  }, []);

  const fetchActors = async () => {
    try {
        const response = await fetch('https://imdb-clone-backend-okgd.onrender.com/api/actors');
        if (!response.ok) {
            const message = `An error occurred: ${response.status}`;
            throw new Error(message);
        }
        const data = await response.json();
        setAvailableActors(data);
    } catch (error) {
        console.error('Error fetching actors:', error);
    }
};

  const handleAddMovie = async (e) => {
    e.preventDefault();
    const actorNamesArray = actorNamesInput
    .split(',')
    .map((name) => name.trim())
    .filter((name) => name !== '');

    const movieData = {
      name,
      yearOfRelease: parseInt(yearOfRelease),
      plot,
      poster,
      producerName: producerName,
      actorNames: actorNamesArray,
    };

    if (newActorName) {
      try {
        const newActorResponse = await axios.post('https://imdb-clone-backend-okgd.onrender.com/api/actors', {
          name: newActorName,
        });
        movieData.actorNames = [...actorNamesArray, newActorName];
        alert(`Actor "${newActorName}" added successfully.`);
        setNewActorName('');
        fetchActors(); 
      } catch (error) {
        console.error('Error adding new actor:', error);
        alert('Error adding new actor.');
        return; 
      }
    }

    try {
      const response = await axios.post('https://imdb-clone-backend-okgd.onrender.com/api/movies', movieData);
      console.log('Movie added:', response.data);
      alert('Movie added successfully!');
      navigate('/'); 
    } catch (error) {
      console.error('Error adding movie:', error);
      alert('Error adding movie.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Movie</h2>
      <form onSubmit={handleAddMovie} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
        <label className="form-label">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Year of Release:
          <input
            type="number"
            value={yearOfRelease}
            onChange={(e) => setYearOfRelease(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-label">
          Plot:
          <textarea
            value={plot}
            onChange={(e) => setPlot(e.target.value)}
            className="form-textarea"
          />
        </label>
        <label className="form-label">
          Poster URL:
          <input
            type="text"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            className="form-input"
          />
        </label>

        <h3 className="form-heading">Producer</h3>
        <label className="form-label">
          Producer Name:
          <input
            type="text"
            value={producerName}
            onChange={(e) => setProducerName(e.target.value)}
            required
            className="form-input"
          />
        </label>

        <h3 className="form-heading">Actors</h3>
        <label className="form-label">
          Existing Actor Names (comma-separated, or add new below):
          <input
            type="text"
            value={actorNamesInput}
            onChange={(e) => setActorNamesInput(e.target.value)}
            className="form-input"
          />
        </label>

        <h4 className="form-sub-heading">Add New Actor (Optional)</h4>
        <label className="form-label">
          New Actor Name:
          <input
            type="text"
            value={newActorName}
            onChange={(e) => setNewActorName(e.target.value)}
            className="form-input"
          />
        </label>

        <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
        Add Movie
        </button>
      </form>
    </div>
  );
}

export default AddMovie