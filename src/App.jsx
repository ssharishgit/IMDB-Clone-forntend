import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import AddMovie from './Components/AddMovie'
import MovieList from './Components/MovieList'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Register from './Components/Register'
import { SignIn } from './Components/SignIn'
import { useSelector } from 'react-redux'

function App() {
  const [allmovies,setAllmovies] = useState([])
  const userDetails = useSelector(store=>store.user.values)

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwYzQ1NDliOGRlMTI3ODQ1ZDMzZjdlYTJkNzZmNGYzNSIsIm5iZiI6MS43MzMyMDQzODUwMTQwMDAyZSs5LCJzdWIiOiI2NzRlOTlhMTFhNjNiOGFjMjc5MmVkZjEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tAoNY4cTdk6Ntddn_SN1tczoFfmM9hqN19JKHIBN9FE'
    }
  };
  const getAllMovies = async ()=>{
    try{
      const res = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&region=IN', options);
      let data = await res.json();
      setAllmovies(data.results);
      console.log(data.results);
    }catch(err){
      console.error(err)
    }
  }

  useEffect(()=>{
    getAllMovies()
  },[])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home allmovies={allmovies} />} />
        <Route path="/add" element={<AddMovie />} />
        <Route path="/movielist" element={<MovieList />} />

        <Route path='/register' element={<Register />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
