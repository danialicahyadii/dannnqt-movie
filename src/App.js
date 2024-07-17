
import { useEffect, useState } from 'react';
import './App.css';
import {getMovieList, searchMovie} from './api';

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(()=>{
    getMovieList().then((results)=>{
      setPopularMovies(results);
    })
  },[])

  const search = async (q) => {
    if(q.length > 3){
      const query = await searchMovie(q)
      setPopularMovies(query.results);
    }
  }

  console.log(popularMovies);
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Dannnqt Movie Mania</h1>
          <input 
          placeholder='cari film kesayanganmu...' 
          className='Movie-search'
          onChange={({target}) => search(target.value)}
          />
          <div className="Movie-container">
            {popularMovies.map((movie, index)=>{
              return(
                <div key={index} className="Movie-wrapper">
                  <div className="Movie-title">{movie.title}</div>
                  <img className="Movie-image" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}/>
                  <div className="Movie-date">release: {movie.release_date}</div>
                  <div className="Movie-rate">{movie.vote_average.toFixed(1)}</div>
                </div>
              );
            })}
          </div>
        </header>
      </div>
    </>
  )
}

export default App;
