import { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";

import { tmdbService } from "../config/axios";

import { AiFillStar } from "react-icons/ai";

import style from "./Movie.module.css";

type Movie = {
  title: string,
  genres: [
    {
      id: number,
      name: string
    }
  ] | [],
  overview: string,
  poster_path: string,
  release_date: string,
  vote_average: number,
  runtime: number | null,
  backdrop_path: string
}

type Similar = {
  results: [
    {
      id: number,
      poster_path: string,
      title: string,
      vote_average: number
    }
  ] | []
}


const Movie = () => {

  let {id} = useParams<string>();

  const [movie, setMovie] = useState<Movie | null>(null);

  const [similar, setSimilar] = useState<Similar | null>(null);

  useEffect(() => {
  
      const getMovies = async () => {
        const response = await tmdbService.get(`/movie/${id}?language=pt-BR`);
        setMovie(response.data);
  
      }
  
      getMovies();
  
  }, [id]);


  useEffect(() => {
  
      const getMoviesSimilar = async () => {
        const response = await tmdbService.get(`/movie/${id}/similar?language=pt-BR`);
        setSimilar(response.data);
        window.scrollTo(0, 0);
      }
  
      getMoviesSimilar();
  
  }, [id]);

  const similares = similar?.results.filter((movie) => movie.poster_path !== null);


  return (
      <main>
        <section className={style.container} style={ movie?.backdrop_path ? {background: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) no-repeat center / cover`} : {background: `url(https://image.tmdb.org/t/p/original${movie?.poster_path}) no-repeat center / cover`}}>
          <article className={style.info}>
            <h1 className={style.title}>{movie?.title}</h1>
            <div>
              <img src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`} alt="poster" />
              <p className={style.average}>
                <AiFillStar className={style.star}/> <span>{movie?.vote_average.toFixed(1)}</span>
              </p>
            </div>
            <div className={style.movie}>
              <p><span>Data de lançamento:</span> {movie?.release_date.split("-").reverse().join("/")}</p>
              <p><span>Tempo: </span>{movie?.runtime ? movie.runtime + " min." : "Não informado."}</p>
              <div className={style.genres}>
                <p><span>Gêneros:</span>
                  {movie?.genres.length === 0 ? "Não informado." : (movie?.genres.map((genre) => (
                    <span key={genre.id} className={style.genre}> {genre.name}</span>
                  )))}
                </p>
              </div>
              <p><span>Sinopse:</span> <span className={style.synopsis}>{movie?.overview === "" ? "Sem sinopse em português." : movie?.overview}</span></p>
            </div>
          </article>
        </section>
        {similares?.length !== 0 && (
          <section className={style.similar}>
          <h2>Semelhantes</h2>
          <div className={style.movies_container}>
          {similares?.map((movie) => (
              <article key={movie.id}>
                <div className={style.container_img}>
                  <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt="poster"/>
                  <Link to={`/movie/${movie.id}`} className={style.button}>Ver mais</Link>
                </div>
                <h3>{movie.title}</h3>
              </article>
          ))}
        </div>
        </section>
        )}
      </main>
  )
}

export default Movie;