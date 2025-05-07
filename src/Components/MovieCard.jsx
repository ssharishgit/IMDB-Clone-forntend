import { useNavigate } from 'react-router-dom'

export function MovieCard({id,title,release_date,poster_path,content,genre_ids,genreArray,popularity,producer}){

  const navigate = useNavigate()
  
  const url = "https://image.tmdb.org/t/p/original"

  let date = new Date(release_date)
  let options = { day: '2-digit', month: '2-digit', year: 'numeric' }
  let formattedDate = date.toLocaleDateString('en-GB', options)

  let genres = genreArray.filter(item => genre_ids.includes(item.id)).map(item => item.name)
  genres = genres.toString() 

  return (
    <>
      <div className="w-56 cursor-pointer">
        <img className="w-full rounded-md h-[336px]" src={url+poster_path} alt={title} />
      </div>
      <div className="w-56 cursor-pointer">
        <h1 className="text-lg font-semibold leading-5 pt-4 pb-1">{title}</h1>
        <h4 className="text-xs text-neutral-500">({formattedDate})</h4>
        <h4 className="text-sm text-neutral-700 pt-2">{producer}</h4>
        <h5 className="text-neutral-700 pt-2 text-xs">{genres}</h5>
      </div>

    </>
  )
}