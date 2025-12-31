import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import style from "./App.module.css";

function App() {

  const [show, setShow] = useState<boolean>(false);


  return (
    <div className={style.app}>
      <Navbar show={show}  setShow={setShow} />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App;
