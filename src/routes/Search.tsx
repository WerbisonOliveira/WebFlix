import SearchMovie from "./SearchMovie";

import { useState, useEffect } from "react";

import { tmdbService } from "../config/axios";

import { useSearchParams } from "react-router-dom";

import style from './Search.module.css';
import SearchTv from "./SearchTv";

const Search = () => {

    const [movie, setMovie] = useState<boolean>(true);
    const [tv, setTv] = useState<boolean>(false);
    
    const [movieTotal, setMovieTotal] = useState<number>();
    const [tvTotal, setTvTotal] = useState<number>();

    const [searchParams] = useSearchParams();

    useEffect(() => {
      
        const getMovies = async () => {
        const response = await tmdbService.get(`/search/movie?query=${searchParams.get("q")}&include_adult=false&language=pt-BR`);
            setMovieTotal(response.data.total_results); 
        }
    
        getMovies();
    
    }, [searchParams]);

    useEffect(() => {
      
        const getSeries = async () => {
        const response = await tmdbService.get(`/search/tv?query=${searchParams.get("q")}&include_adult=false&language=pt-BR`);
            setTvTotal(response.data.total_results);
        }
    
        getSeries();
    
    }, [searchParams]);

    

    const replaceToTv = () => {
        if (movie) {
            setMovie(false)
            setTv(true);
        }
    }

    const replaceToMovie= () => {
        if (tv) {
            setMovie(true)
            setTv(false);
        }
    }

    return (
        <main className={style.search}>
            <h1 className={style.title}>Resultados: <span>{searchParams.get("q")}</span></h1>
            <div className={style.container_results}>
                <button type='button' onClick={() => replaceToMovie()}><span>Filmes:</span> {movieTotal}</button>
                <button type='button' onClick={() => replaceToTv()}><span>Séries:</span> {tvTotal}</button>
            </div>
            <section>
                {movie && <SearchMovie />}
                {tv && <SearchTv />}
            </section>
        </main>
    )
}

export default Search;