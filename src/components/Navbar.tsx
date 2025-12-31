import { useState, type FormEvent, type KeyboardEvent } from "react";

import { useNavigate } from "react-router-dom";

import { NavLink } from "react-router-dom";

import {BsSearch} from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";

import style from "./Navbar.module.css";

type Menu = {
  show: boolean,
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar = ({show, setShow}:Menu) => {

  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");

  const Search = (event: KeyboardEvent) => {
    search && event.code === "Enter" && navigate(`search/results?q=${search}`);

  }

  const formSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    search && navigate(`/search/results?q=${search}`) && setSearch("");
    search && showMenu();
  }

  const showMenu = () => {
    if(show) {
      setShow(false);
    } else {
      setShow(true);
    }

  }


  
  return (
    <header className={style.header}>
      <NavLink to={"/"} className={style.logo}><h2>Web<span>Flix</span></h2></NavLink> 
      <nav className={style.nav}>
          <div className={show ? style.showMenu : style.container_menu}>
            <ul >
              <li>
                <NavLink to={"/"} className={style.link} onClick={() => showMenu()}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/movies"} className={style.link} onClick={() => showMenu()}>Filmes</NavLink>
              </li>
              <li>
                <NavLink to={"/series"} className={style.link} onClick={() => showMenu()}>Séries</NavLink>
              </li>
            </ul>
            <form  onSubmit={(event) => formSearch(event)}>
              <input type="search" name="search" placeholder="Buscar filme ou série" value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(event) => Search(event)}/>
              <button><BsSearch /></button>
            </form>
          </div>
      </nav>
      <button className={style.menu} onClick={() => showMenu()}>
        <AiOutlineMenu />
      </button>
    </header>
  )
}

export default Navbar;