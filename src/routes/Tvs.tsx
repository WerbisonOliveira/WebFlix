import { useState, useEffect } from 'react';

import { tmdbService } from '../config/axios';

import { Link } from 'react-router-dom';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import style from './Tvs.module.css';

type Serie = {
  results: [
    {
      id: number,
      name: string,
      poster_path: string
    }
  ] | [],
  total_pages: number
}

const Tvs = () => {

  const [series, setSeries] = useState<Serie | null>(null);
    const [page, setPage] = useState<number>(1);
  
    useEffect(() => {
      const getSeries = async () => {
        const response = await tmdbService.get(`/tv/popular?language=pt-BR&page=${page}`);
  
        setSeries(response.data);
        window.scroll(0, 0);
      }
  
      getSeries();
  
    }, [page]);
  
    const moviesFiltered = series?.results.filter((serie) => serie.poster_path !== null);


  return (
    <main>
      <div className={style.title}>
        <h1>Séries</h1>
      </div>
      <section className={style.serie}>
        {moviesFiltered?.map((serie) => (
          <article key={serie.id}>
            <h3 title={serie.name}>{serie.name}</h3>
            <div className={style.container_img}>
              <img src={`https://image.tmdb.org/t/p/w200${serie.poster_path}`} alt={serie.name} />
              <Link to={`/tv/${serie.id}`} className={style.button}>Ver mais</Link>
            </div>
          </article>
        ))}
      </section>
      <div className={style.container_btn}>
          {page > 1 && (
          <button type='button' className={style.btnPrevious} onClick={() => setPage(page - 1)}><AiOutlineArrowLeft/> Voltar</button>
          )}
          {page !== series?.total_pages && (
              <button type='button' className={style.btnNext} onClick={() => setPage(page + 1)}>Próximo <AiOutlineArrowRight/></button>
          )}
      </div>
    </main>
  )
}

export default Tvs;