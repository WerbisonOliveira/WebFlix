import { useState, useEffect } from 'react';

import { useParams, Link } from 'react-router-dom';

import { tmdbService } from '../config/axios';

import { AiFillStar } from 'react-icons/ai';

import style from './Tv.module.css';

type Tv = {
    name: string,
    poster_path: string,
    vote_average: number
    genres: [
        {
        id: number,
        name: string
        }
    ] | [],
    number_of_episodes: number,
    overview: string,
    number_of_seasons: number,
    first_air_date: string,
    last_air_date: string,
    backdrop_path: string
}

type Similar = {
  results: [
    {
      id: number,
      poster_path: string,
      name: string,
      vote_average: number
    }
  ] | []
}

const Tv = () => {

    let {id} = useParams();

    const [tv, setTv] = useState<Tv | null>(null);

    const [similar, setSimilar] = useState<Similar | null>(null);

    useEffect(() => {
  
      const getTvs = async () => {
        const response = await tmdbService.get(`/tv/${id}?language=pt-BR`);
        setTv(response.data);
        
      }
  
      getTvs();
  
    }, [id]);


    useEffect(() => {
  
      const getTvsSimilar = async () => {
        const response = await tmdbService.get(`/tv/${id}/similar?language=pt-BR`);
        setSimilar(response.data);
        window.scrollTo(0, 0);
      }
  
      getTvsSimilar();
  
    }, [id]);

    const similares = similar?.results.filter((tv) => tv.poster_path !== null);
  

    return (
        <main>
            <section className={style.container} style={ tv?.backdrop_path ? {background: `url(https://image.tmdb.org/t/p/original${tv?.backdrop_path}) no-repeat center / cover`} : {background: `url(https://image.tmdb.org/t/p/original${tv?.poster_path}) no-repeat center / cover`}}>
                <article className={style.info}>
                    <h1 className={style.title}>{tv?.name}</h1>
                    <div>
                        <img src={`https://image.tmdb.org/t/p/w300${tv?.poster_path}`} alt="poster" />
                        <p className={style.average}>
                            <AiFillStar className={style.star}/> <span>{tv?.vote_average.toFixed(1)}</span>
                        </p>
                    </div>
                    <div className={style.tv}>
                        <p><span>Temporadas:</span> {tv?.number_of_seasons}</p>
                        <p><span>Total de episódios:</span> {tv?.number_of_episodes}</p>
                        <p><span>Data de lançamento:</span> {tv?.first_air_date.split("-").reverse().join("/")}</p>
                        <p><span>Último episódio lançado: </span>{tv?.last_air_date?.split("-").reverse().join("/")}</p>
                        <div className={style.genres}>
                            <p><span>Gêneros:</span>
                                {tv?.genres.length === 0 ? "Não informado." : (tv?.genres.map((genre) => (
                                    <span key={genre.id} className={style.genre}> {genre.name}</span>
                                )))}
                            </p>
                        </div>
                        <p><span>Sinopse:</span> <span className={style.synopsis}>{tv?.overview === "" ? "Sem sinopse em português." : tv?.overview}</span></p>
                    </div>
                </article>
            </section>
            {similares?.length !== 0 && (
                <section className={style.series}>
                    <h2>Semelhantes</h2>
                    <div className={style.series_container}>
                    {similares?.map((serie) => (
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
            )}
        </main>
    )
}

export default Tv;