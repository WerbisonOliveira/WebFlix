import logo from "../assets/logo_TMDB.svg";

import style from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div>
        <div className={style.credits}>
          <p>Créditos:</p>
          <img src={logo} alt="logo do TMDB" />
          <span>Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.</span>
        </div>
      </div>
      <div className={style.copy}>
        <span>&copy; 2025 - Desenvolvido por <a href="https://github.com/WerbisonOliveira" target="_blank">Werbison Oliveira</a></span>
      </div>
    </footer>
  )
}

export default Footer;