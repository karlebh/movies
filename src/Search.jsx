import React, { useState } from 'react'
import { debounce } from 'lodash'
import axios from 'axios'

export const Search = () => {
  const [result, setResult] = useState([])
  const [movie, setMovie] = useState('')

  const searchMovie = (e) => {
    setMovie(e.target.value)
    setTimeout(async () => {
      await axios.get(`https://www.omdbapi.com/?s=${e.target.value}&apikey=4a993ec1`)
        .then(response => {
          setResult(response.data.Search)
          // console.log(response.data.Search)
        })
    }, 400)
  }

  return (

    <div className='relative z-30' >
      <input type="text" className='border-gray-900 border w-full h-[54px] px-3' value={movie}
        onChange={searchMovie} />
      {!!result?.length && <button onClick={() => { setResult([]); setMovie('') }} className='w-full h-full inset-0 fixed z-10 bg-transparent'></button>}
      {
        !!result?.length && <div className="absolute bg-gray-800 text-gray-100 w-full shadow-lg z-30">
          {result?.map((movie, id) => <div key={id} className='p-4 cursor-pointer hover:bg-gray-600 flex justify-between items-center'>
            <img src={movie.Poster} alt="" className='w-10 h-10 rounded-full' />
            <h1>{movie.Title}</h1>
            <p>{movie.Year}</p>
          </div>)}
        </div>
      }
    </div >
  )
}
