import { useEffect, useState } from 'react'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import desktopHero from './desktopHero.png'
import mobileHero from './mobileHero.png'
import { Search } from './Search'

function App() {
  const localAction = localStorage.action ? JSON.parse(localStorage.getItem('action')) : []
  const localAdventure = localStorage.adventure ? JSON.parse(localStorage.getItem('adventure')) : []
  const [action, setAction] = useState(localAction)
  const [adventure, setAdventure] = useState(localAdventure)
  const [loading, setLoading] = useState(false)

  const getAction = async () => await axios.get(`https://www.omdbapi.com/?s=avenger&apikey=4a993ec1`)
    .then(response => {
      setLoading(true)
      
      setAction([...response.data.Search])
      localStorage.setItem('action', JSON.stringify(response.data.Search))
      setLoading(false)
    })
  const getAdventure = async () => await axios.get(`https://www.omdbapi.com/?s=pirate&apikey=4a993ec1`)
    .then(response => {
      setLoading(true)
      setAdventure([...response.data.Search])
      localStorage.setItem('adventure', JSON.stringify(response.data.Search))
      setLoading(false)
    })

  useEffect(() => {
    if (!action.length) {
      getAction()
    }
  }, [])

  useEffect(() => {
    if (!adventure.length) {
      getAdventure()
    }
  }, [])

  return (
    <div className="">
      <header>
        <div className='bg-[#292929] h-[140px] flex items-center justify-center lg:justify-start lg:pl-[77px]'>
          <div className='inline-flex items-center justify-center'>
            <h1 className='text-white border text-2xl py-1 px-3' style={{ fontFamily: "Times New Roman" }}>MyTestApp</h1>
          </div>
        </div>
        <div className='relative'>
          <img src={desktopHero} alt="" className='w-full object-cover h-[550px] hidden lg:block' />
          <img src={mobileHero} alt="" className='w-full object-cover h-[275px] md:h-[550px] lg:hidden' />
          <div className='text-white absolute top-[109px] left-[77px] font-semibold text-7xl hidden leading-[93.74px] lg:block'>
            <h1>Watch <br /> Something <br /> Incredible. <br /></h1>
          </div>
          <div className='text-white absolute top-[109px] font-semibold text-2xl sm:text-4xl leading-[36.46px] md:leading-[93.74px] md:text-6xl flex justify-center w-full text-center lg:hidden'>
            <h1>Watch <br className='hidden md:block lg:hidden' /> Something <br /> Incredible. <br /></h1>
          </div>
        </div>

      </header>
      <main className='bg-white px-[15px] py-[30px] md:p-[77px]'>
        <div>
          <label>Search</label><br />
          <Search />
        </div>

        <div className='mt-10'>

          <h3>Action</h3>
          <div className="overflow-y-hidden wrapper whitespace-nowrap overflow-x-auto cursor-grab rounded-xl dragscroll"

          >
            {loading && action.length === 0 ? <Skeleton count={3} /> : action.map((movie, index) => <div key={index}
              className='p-[10px] inline-block overflow-hidden'>
              <img src={movie.Poster} className=' h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-xl' alt="" />
            </div>)}
          </div>
        </div>

        <div className='mt-10'>
          <h3>Adventure</h3>
          <div className="overflow-y-hidden wrapper whitespace-nowrap overflow-x-auto cursor-grab rounded-xl dragscroll"

          >
            {loading && adventure.length === 0 ? <Skeleton count={3} /> : adventure.map((movie, index) => <div key={index}
              className='p-[10px] inline-block overflow-hidden'>
              <img src={movie.Poster} className=' h-[200px] w-[200px] md:h-[300px] md:w-[300px] rounded-xl' alt="" />
            </div>) }
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
