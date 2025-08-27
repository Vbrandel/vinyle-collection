import { useState } from 'react'
import './App.css'
import VinylGrid from "./components/VinylGrid";
import Tags from './components/Tags';
import Footer from './components/Footer';
import vinyles from './data/vinyles.json';

function App() {
  const [sortOption, setSortOption] = useState('title-asc')
  const [selectedTag, setSelectedTag] = useState(null)
  const handleSelectTag = (tag) => {
    setSelectedTag((prev) => (prev === tag ? null : tag))
  }

  return (
    <>
    <body>
    <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-8 md:pt-12'>
      <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-zinc-600 md:text-5xl lg:text-6xl text-center'>Ma collection de vinyles</h1>
      <p className='text-center text-lg text-zinc-500 mb-4'>{vinyles.length} vinyles listés</p>
      
      <div>
      <Tags selectedTag={selectedTag} onSelectTag={handleSelectTag} /> 
      </div>
      <div className='flex mb-4 justify-center'>
        <label className='sr-only' htmlFor='sort'>Trier</label>
        <select
          id='sort'
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='px-3 py-2 rounded-full text-sm border bg-white text-zinc-700 border-zinc-300 shadow-sm'
        >
          <option value='title-asc'>Titre A→Z</option>
          <option value='title-desc'>Titre Z→A</option>
          <option value='artist-asc'>Artiste A→Z</option>
          <option value='year-desc'>Année ↓</option>
          <option value='love-first'>Coup de cœur</option>
        </select>
      </div>
      <VinylGrid sortOption={sortOption} selectedTag={selectedTag} />
    <Footer />
    </div>
    </body>
    </>

  )
}

export default App
