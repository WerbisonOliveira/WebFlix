import Button from "../components/Button";

import { Link } from "react-router-dom";

import { useState, useEffect } from "react";

import { tmdbService } from "../config/axios";

import style from "./Home.module.css";

type Movie = {
  id: number,
  title: string,
  poster_path: string
}

type Serie = {
  id: number,
  name: string,
  poster_path: string
}

type Trending = {
  results: [
    {
      id: number,
      poster_path: string,
      title: string | null,
      name: string | null,
      media_type: string
    }
  ]
  
}

const Home = () => {

  const [movie, setMovies] = useState<Movie[] | [] >([]);
  const [series, setSeries] = useState<Serie[] | [] >([]);
  const [topRated, setTopRated] = useState<Movie[] | null>(null);
  const [topRatedTv, setTopRatedTv] = useState<Serie[] | null>(null);
  const [trending, setTrending] = useState<Trending | null>(null);
  const [showButton, setShowButton] = useState<Boolean>(false);

  useEffect(() => {

    const getTrending = async () => {
      const response = await tmdbService.get("/trending/all/day?language=pt-BR");

      setTrending(response.data);
      
    }

    getTrending();

  }, []);

  const trendingFiltered = trending?.results.filter((trending) => trending.media_type !== "person");

  useEffect(() => {

    const getMovies = async () => {
      const response = await tmdbService.get("/movie/popular?language=pt-BR");

      setMovies(response.data.results);
      
    }

    getMovies();

  }, []);


  useEffect(() => {

    const getSeries = async () => {
      const response = await tmdbService.get("/tv/popular?language=pt-BR");

      setSeries(response.data.results);
      
    }

    getSeries();

  }, []);


  useEffect(() => {

    const getTopRated = async () => {
      const response = await tmdbService.get("/movie/top_rated?language=pt-BR");

      setTopRated(response.data.results);
      
    }

    getTopRated();

  }, []);


  useEffect(() => {

    const getTopRated = async () => {
      const response = await tmdbService.get("/tv/top_rated?language=pt-BR");

      setTopRatedTv(response.data.results);
      
    }

    getTopRated();

  }, []);

  const Scroll = ():void => {
    const html = document?.documentElement;
    window?.addEventListener("scroll", () => {
      if (html?.scrollTop > 500) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });

  }

  Scroll();

  return (
    <main>
      <Button showButton={showButton}/>
      <section className={style.trending}>
        <h2>Tendências</h2>
        <div className={style.trending_container}>
          {trendingFiltered?.map((trending) => (
              <article key={trending.id}>
                <div className={style.container_img}>
                  <img src={`https://image.tmdb.org/t/p/w200${trending.poster_path}`} alt="poster"/>
                  <Link to={trending.media_type === "movie" ? `/movie/${trending.id}` : `/tv/${trending.id}`} className={style.button}>Ver mais</Link>
                </div>
                <h3>{trending.media_type === "movie" ? trending.title : trending.name}</h3>
              </article>
          ))}
        </div>
      </section>
      <section className={style.movies}>
        <h2>Filmes Populares</h2>
        <div className={style.movies_container}>
          {movie?.map((movie) => (
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
      <section className={style.series}>
        <h2>Séries Populares</h2>
        <div className={style.series_container}>
          {series?.map((serie) => (
            <article key={serie.id}>
              <div className={style.container_img}>
                <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt="poster" />
                <Link to={`/tv/${serie.id}`} className={style.button}>Ver mais</Link>
              </div>
              <h3>{serie.name}</h3>
            </article>
          ))}
        </div>
      </section>
      <section className={style.movies}>
        <h2>Filmes com melhores avaliações</h2>
        <div className={style.movies_container}>
          {topRated?.map((movie) => (
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
      <section className={style.series}>
        <h2>Séries com melhores avaliações</h2>
        <div className={style.series_container}>
          {topRatedTv?.map((serie) => (
            <article key={serie.id}>
              <div className={style.container_img}>
                <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt="poster" />
                <Link to={`/tv/${serie.id}`} className={style.button}>Ver mais</Link>
              </div>
              <h3>{serie.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home;