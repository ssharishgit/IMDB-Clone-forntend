import React, { useEffect, useState } from 'react'
import { MovieCard } from './MovieCard';
import { useDispatch } from 'react-redux';
import { clearMovie } from '../utils/movieSlice';
import { useLocation } from 'react-router-dom';

const Home = ({allmovies}) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const [producerArray, setProducerArray] = useState([]);

  const value = location.state?.value || false
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzQ1NDliOGRlMTI3ODQ1ZDMzZjdlYTJkNzZmNGYzNSIsIm5iZiI6MS43MzMyMDQzODUwMTQwMDAyZSs5LCJzdWIiOiI2NzRlOTlhMTFhNjNiOGFjMjc5MmVkZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tAoNY4cTdk6Ntddn_SN1tczoFfmM9hqN19JKHIBN9FE'
    }
  };

  const getProducer = async (id) => {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options);
      let data = await res.json();
      return data.production_companies.length > 0 ? data.production_companies[0].name : "N/A";
    } catch (err) {
      console.error(err);
      return " "; 
    }
  };

  const getAllProducers = async () => {
    const producers = await Promise.all(
      allmovies.map(async (item) => {
        return await getProducer(item.id);
      })
    );
    setProducerArray(producers);
  };

  useEffect(() => {
    dispatch(clearMovie());
    location.state = null;
    document.body.style.overflow = 'auto';
  }, [dispatch, location]);

  useEffect(() => {
    getAllProducers();
  }, [allmovies]);

  const genreArray = [
    { "id": 28, "name": "Action" }, { "id": 12, "name": "Adventure" }, { "id": 16, "name": "Animation" }, { "id": 35, "name": "Comedy" },
    { "id": 80, "name": "Crime" }, { "id": 99, "name": "Documentary" }, { "id": 18, "name": "Drama" }, { "id": 10751, "name": "Family" },
    { "id": 14, "name": "Fantasy" }, { "id": 36, "name": "History" }, { "id": 27, "name": "Horror" }, { "id": 10402, "name": "Music" },
    { "id": 9648, "name": "Mystery" }, { "id": 10749, "name": "Romance" }, { "id": 878, "name": "Science Fiction" },
    { "id": 10770, "name": "TV Movie" }, { "id": 53, "name": "Thriller" }, { "id": 10752, "name": "War" }, { "id": 37, "name": "Western" }
  ];

  console.log("Producer Array:", producerArray);
  
  return (
    <div className='w-5/6 mx-auto py-4'>
      <h1 className='text-2xl font-bold leading-7 py-4'>Trending Movies</h1>
      <div className='flex flex-wrap gap-8 pb-8'>
        {allmovies.map((element,index) =>(
          <div key={index}>
            <MovieCard {...element}
            content = {element}
            genreArray = {genreArray}
            producer = {producerArray[index]}
            key={element.id}
            />
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Home
