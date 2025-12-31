import { useState, useEffect } from 'react';

import { useSearchParams, Link } from 'react-router-dom';

import { tmdbService } from '../config/axios';

import { type Search } from '../types/Search';

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import style from "./SearchTv.module.css";

const SearchTv = () => {

    const [searchParams] = useSearchParams();

    const [results, setResults] = useState<Search>();

    const [pages, setPages] = useState<number>(1);

    const [search, setSearch] = useState<string | null>(null);

    if (search !== searchParams.get("q")) {
        pages !== 1 && setPages(1);
    }

    useEffect(() => {
  
      const getMovies = async () => {
        const response = await tmdbService.get(`/search/tv?query=${searchParams.get("q")}&include_adult=false&language=pt-BR&page=${pages}`);
        setResults(response.data);

        setSearch(searchParams.get("q"));
        window.scroll(0, 0);
      }
  
      getMovies();
  
    }, [searchParams, pages]);

    const result = results?.results.filter((tv) => tv.poster_path !== null);


    return (
        <main>
            <section>
                <div className={style.search_container}>
                    {result?.length === 0 && pages === 1 ? <p className={style.feedback}>Não foram encontradas respostas para a sua pesquisa.</p> : result?.map((result) => (
                        <article key={result.id}>
                            <h3 title={result.name}>{result.name}</h3>
                            <div className={style.container_img}>
                                <img src={`https://image.tmdb.org/t/p/w300${result.poster_path}`} alt="poster" />
                                <Link to={`/tv/${result.id}`} className={style.button}>Ver mais</Link>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <div className={style.container_btn}>
                {pages > 1 && (
                <button type='button' className={style.btnPrevious} onClick={() => setPages(pages - 1)}><AiOutlineArrowLeft/> Voltar</button>
                )}
                {pages !== results?.total_pages && (
                    <button type='button' className={style.btnNext} onClick={() => setPages(pages + 1)}>Próximo <AiOutlineArrowRight/></button>
                )}
            </div>
        </main>
    )
    
}

export default SearchTv;