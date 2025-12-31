import { useState, useEffect } from 'react';

import { tmdbService } from '../config/axios';

import { Link } from 'react-router-dom';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import style from './Movies.module.css';

type Movie = {
  results: [
    {
      id: number,
      title: string,
      poster_path: string
    }
  ] | [],
  total_pages: number
}

const Movies = () => {

  const [movies, setMovies] = useState<Movie | null>(null);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const getMovies = async () => {
      const response = await tmdbService.get(`/movie/popular?language=pt-BR&page=${page}`);

      setMovies(response.data);
      window.scroll(0, 0);
    }

    getMovies();

  }, [page]);

  const moviesFiltered = movies?.results.filter((movie) => movie.poster_path !== null);

  return (
    <main>
      <div className={style.title}>
        <h1>Filmes</h1>
      </div>
      <section className={style.movie}>
        {moviesFiltered?.map((movie) => (
          <article key={movie.id}>
            <h3 title={movie.title}>{movie.title}</h3>
            <div className={style.container_img}>
              <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
              <Link to={`/movie/${movie.id}`} className={style.button}>Ver mais</Link>
            </div>
          </article>
        ))}
      </section>
      <div className={style.container_btn}>
          {page > 1 && (
          <button type='button' className={style.btnPrevious} onClick={() => setPage(page - 1)}><AiOutlineArrowLeft/> Voltar</button>
          )}
          {page !== movies?.total_pages && (
              <button type='button' className={style.btnNext} onClick={() => setPage(page + 1)}>Próximo <AiOutlineArrowRight/></button>
          )}
      </div>
    </main>
  )
}

export default Movies