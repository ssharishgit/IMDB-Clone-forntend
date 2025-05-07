import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearUser } from '../utils/userSlice'

const Navbar = ({findIt}) => {
  const userDetails = useSelector(store=>store.user.values)
  const [selectedType,setSelectedType] = useState('Title')
  const [placeholder,setPlaceholder] = useState('Search movies by Title')
  const [searchData,setSearchData] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const changetype = (event) =>{
    setSelectedType(event.target.value)
    if(event.target.value == 'Title'){
      setPlaceholder('Search movies by Title')
    }else if(event.target.value == 'Genre'){
      setPlaceholder('Search movies by Genre')
    }else{
      setPlaceholder('Search movies by RealseDate DD/MM/YYYY')
    }
    setSearchData('')
    handleSearch()
  }

  const handleData = (event) =>{
    if(searchData != event.target.value){
      setSearchData(event.target.value)
    }
  }

  const handleAdminLogin = () =>{
    navigate('/signin',{state:{role:'admin'}})
  }

  // const handleLogout = ()=>{
  //   dispatch(clearUser())
  //   navigate('/')
  // }
  
  useEffect(() =>{
    if (searchData.length > 2){
      if(selectedType != 'Realse date') {
        findIt(selectedType, searchData)
      }else if(searchData.length > 9){
        findIt(selectedType, searchData)
      }
    }
  }, [searchData])

  const handleClick = () =>{
    navigate('/movielist')
  }
  return (
    <div className='w-full bg-gray-100'>
      <div className='w-5/6 mx-auto flex justify-between'>
        <Link className='title md:w-1/5 flex items-start py-4' to='/'>
          <h1 className=' md:text-xl py-1.5 text'>IMDB C\one</h1>
        </Link>
        <div className='md:w-1/5 flex items-center justify-evenly sm:text-base xss:text-sm py-4'>
          <Link to="/add" style={{ textDecoration: 'none' }}>Add Movie</Link>
          <button style={{ padding: '8px' }} className='text-sm rounded-md bg-teal-500 text-white '
            onClick={handleClick}>
            Created Movies
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
