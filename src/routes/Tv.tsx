import { useState, useEffect, type MouseEvent } from 'react';

import { useParams, Link } from 'react-router-dom';

import { tmdbService } from '../config/axios';

import { AiFillStar } from 'react-icons/ai';
import { FaServer } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";

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
    backdrop_path: string,
    seasons: [
        {
            id: number,
            name: string,
            episode_count: number,
            season_number: number
        }
    ] | []
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

type InfoSeason = {
    name: string,
    episodes: [
        {
            id: number,
            name: string,
            episode_number: number
        }
    ] | []
}

type Episode = {
    name: string,
    episode_number: number | null
}


const Tv = () => {

    let {id} = useParams();

    const [tv, setTv] = useState<Tv | null>(null);

    const [similar, setSimilar] = useState<Similar | null>(null);

    const [season, setSeason] = useState<number>(1);

    const [server, setServer] = useState<string>("https://redeflixapi.bar/serie");

    const [infoSeason, setInfoSeason] = useState<InfoSeason | null>(null);

    const [Episode, setEpisode] = useState<Episode | null>(null);


    const changeEpisode = (episode_number: number, name: string) => {
        setEpisode({episode_number, name});
    }

    const changeServer = (embed: string) => {
        let video: HTMLIFrameElement | null = document.querySelector(`.${style.video}`);
        setServer(embed)

        video?.setAttribute("src", `${embed}/${id}/${season}/${Episode?.episode_number}`);
        

        embed === "https://myembed.biz/serie" ? video?.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms") : video?.removeAttribute("sandbox")
        embed === "https://myembed.biz/serie" ? video?.setAttribute("referrerpolicy", "no-referrer") : video?.removeAttribute("referrerpolicy");
        
        let server = document.querySelectorAll(`.${style.server}`);
        server.forEach(serverElement => {
        serverElement.getAttribute("value") !== embed ? serverElement.classList.remove(`${style.on}`) : serverElement.classList.add(`${style.on}`)
        })
    }

    useEffect(() => {
  
      const getTvs = async () => {
        const response = await tmdbService.get(`/tv/${id}?language=pt-BR`);
        setTv(response.data);  
      }

      const getTvsSimilar = async () => {
        const response = await tmdbService.get(`/tv/${id}/similar?language=pt-BR`);
        setSimilar(response.data);
        window.scrollTo(0, 0);
      }
      
      getTvs();

      getTvsSimilar();

      changeServer(`${server}`);
  
    }, [id]);

    const similares = similar?.results.filter((tv) => tv.poster_path !== null);


    useEffect(() => {

      const getEpisodes = async () => {
        const episodes = await tmdbService.get(`/tv/${id}/season/${season}?language=pt-BR`);

        setInfoSeason(episodes.data);
        
        episodes.data?.episodes.filter((episode_season: {episode_number: number, name: string}) => episode_season.episode_number === 1 && setEpisode({episode_number: episode_season.episode_number, name: episode_season.name}));
      }

      getEpisodes();

      changeServer(`${server}`);
      
    }, [season]);

    useEffect(() => {
        infoSeason?.episodes.filter(episode_season => episode_season.episode_number === Episode?.episode_number && setEpisode({episode_number: episode_season.episode_number, name: episode_season.name}));

        changeServer(`${server}`);
        
    }, [Episode?.episode_number])

    !Episode && infoSeason?.episodes.filter(episode_season => episode_season.episode_number === 1 && setEpisode({episode_number: episode_season.episode_number, name: episode_season.name}));


    const showTemp = () => {
        let hidden_container_temp_options = document.querySelector(`.${style.container_seasons_options}`);
        let show_container_temp_options = document.querySelector(`.${style.show_container_seasons_options}`);

        let icon_temp = document.querySelector(`.${style.icon_temp}`);
        icon_temp?.classList.toggle(`${style.animation}`);

        if(hidden_container_temp_options) {
            hidden_container_temp_options?.classList.add(`${style.show_container_seasons_options}`);
            hidden_container_temp_options.classList.remove(`${style.container_seasons_options}`);
        } else {
            show_container_temp_options?.classList.add(`${style.container_seasons_options}`);
            show_container_temp_options?.classList.remove(`${style.show_container_seasons_options}`);
        }
                 
    }

    const showEpisode = () => {
        let hidden_container_episodes_options = document.querySelector(`.${style.container_episodes_options}`);
        let show_container_episodes_options = document.querySelector(`.${style.show_container_episodes_options}`);

        let icon_ep = document.querySelector(`.${style.icon_ep}`);
        icon_ep?.classList.toggle(`${style.animation}`);

        if(hidden_container_episodes_options) {
            hidden_container_episodes_options?.classList.add(`${style.show_container_episodes_options}`);
            hidden_container_episodes_options.classList.remove(`${style.container_episodes_options}`);
        } else {
            show_container_episodes_options?.classList.add(`${style.container_episodes_options}`);
            show_container_episodes_options?.classList.remove(`${style.show_container_episodes_options}`);
        }
                 
    }

    return (
        <main>
            <section className={style.container} style={tv?.backdrop_path ? {background: `url(https://image.tmdb.org/t/p/original${tv?.backdrop_path}) no-repeat center / cover`} : {background: `url(https://image.tmdb.org/t/p/original${tv?.poster_path}) no-repeat center / cover`}}>
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
                <article className={style.container_servers}>
                    <h2>Escolha um dos servidores disponíveis:</h2>
                    <div className={style.container_video}>
                        <iframe className={style.video} width="860" height="515" title={tv?.name} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" scrolling="no" loading="lazy" referrerPolicy='strict-origin-when-cross-origin' allowFullScreen></iframe>
                        <div className={style.container_temp_ep}>
                            <div className={style.container_temp}>
                                <button className={style.selected_temp} title={infoSeason?.name} onClick={() => showTemp()}>{infoSeason?.name}<MdKeyboardArrowDown className={style.icon_temp}/></button>
                                <div className={style.container_seasons_options}>
                                    {tv?.seasons.filter(season => season.name !== "Especiais" && season.episode_count !== 0).map(season => (
                                        <span className={style.temp} key={season.id} title={season.name} onClick={() => {showTemp(), setSeason(season.season_number)}}>{season.name}</span>
                                    ))}
                                </div>
                            </div>
                            <div className={style.container_ep}>
                                <button className={style.selected_ep} title={`Episódio ${Episode?.episode_number}: ${Episode?.name}`} onClick={() => showEpisode()}><span>Episódio {Episode?.episode_number}: {Episode?.name}</span><MdKeyboardArrowDown className={style.icon_ep}/></button>
                                <div className={style.container_episodes_options}>
                                {infoSeason?.episodes.map(episode => (
                                    <span className={style.ep} key={episode.id} title={episode.name} onClick={() => {showEpisode(), changeEpisode(episode.episode_number, episode.name)}}>Episódio {episode.episode_number}: {episode.name}</span>
                                ))}
                                </div>
                            </div>
                        </div>
                        <div className={style.container_players}>
                            <button className={`${style.server}` + ` ${style.on}`} value={"https://redeflixapi.bar/serie"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 1</button>

                            <button className={style.server} value={"https://api.pomfy.stream/serie"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 2</button>

                            <button className={style.server} value={"https://fembed.lol/serie"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 3</button>

                            <button className={style.server} value={" https://megaembedapi.site/embed/"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 4</button>

                            <button className={style.server} value={"https://player.videasy.to/tv"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 5</button>

                            <button className={style.server} value={"https://myembed.biz/serie"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 6</button>

                            <button className={style.server} value={"https://embedplayapi.top/embed"} onClick={(e: MouseEvent<HTMLButtonElement>) => changeServer(e.currentTarget.value)}><FaServer/> Servidor 7</button>
                        </div>
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