import { useState, useEffect, type MouseEvent } from "react";

import { useParams, Link } from "react-router-dom";

import { tmdbService } from "../config/axios";

import { AiFillStar } from "react-icons/ai";
import { FaServer } from "react-icons/fa";

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

  const changeServer = (embed: string, value: string) => {
    let video: HTMLIFrameElement | null = document.querySelector(`.${style.video}`);
    video?.setAttribute("src", `${embed}`);
    
    let server = document.querySelectorAll(`.${style.server}`);
    server.forEach(serverElement => {
      serverElement.getAttribute("value") !== value ? serverElement.classList.remove(`${style.on}`) : serverElement.classList.add(`${style.on}`)
    })
  }

  useEffect(() => {
  
      const getMovies = async () => {
        const response = await tmdbService.get(`/movie/${id}?language=pt-BR`);
        setMovie(response.data);
  
      }

      const getMoviesSimilar = async () => {
        const response = await tmdbService.get(`/movie/${id}/similar?language=pt-BR`);
        setSimilar(response.data);
        window.scrollTo(0, 0);
      }
  
      getMovies();

      changeServer(`https://redeflixapi.click/filme/${id}`, "1");

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
          <article className={style.container_servers}>
            <h2>Escolha um dos servidores disponíveis:</h2>
            <div className={style.container_video}>
              <iframe className={style.video} width="860" height="515" src={`https://redeflixapi.click/filme/${id}`} title={movie?.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" scrolling="no" loading="lazy" allowFullScreen></iframe>
              <div className={style.container_players}>
                <button className={`${style.server}` + ` ${style.on}`} value={1} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://redeflixapi.bar/filme/${id}`, e.currentTarget.value)}><FaServer/> Servidor 1</button>

                <button className={style.server} value={2} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://api.pomfy.stream/filme/${id}`, e.currentTarget.value)}><FaServer/> Servidor 2</button>

                <button className={style.server} value={3} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://fembed.lol/filme/${id}`, e.currentTarget.value)}><FaServer/> Servidor 3</button>

                <button className={style.server} value={4} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(` https://megaembedapi.site/embed/${id}`, e.currentTarget.value)}><FaServer/> Servidor 4</button>

                <button className={style.server} value={5} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://player.videasy.to/movie/${id}`, e.currentTarget.value)}><FaServer/> Servidor 5</button>

                <button className={style.server} value={6} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://myembed.biz/filme/${id}`, e.currentTarget.value)}><FaServer/> Servidor 6</button>

                <button className={style.server} value={7} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(`https://embedplayapi.top/embed/${id}`, e.currentTarget.value)}><FaServer/> Servidor 7</button>
              </div>
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