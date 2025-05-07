import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MovieList() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://imdb-clone-backend-okgd.onrender.com/api/movies');
            setMovies(response.data);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Movies</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {movies.map(movie => (
                    <li key={movie._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
                        <h3>{movie.name} ({movie.yearOfRelease})</h3>
                        <p>Producer: {movie.producer ? movie.producer.name : 'N/A'}</p>
                        <p>Actors: {movie.actors ? movie.actors.map(actor => actor.name).join(', ') : 'N/A'}</p>
                        {/* Add Edit button here later */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MovieList;