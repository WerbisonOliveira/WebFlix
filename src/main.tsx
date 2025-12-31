import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//pages
import Home from './routes/Home.tsx';
import Movie from './routes/Movie.tsx';
import Tv from './routes/Tv.tsx';
import Search from './routes/Search.tsx';
import Movies from './routes/Movies.tsx';
import Tvs from './routes/Tvs.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/movie/:id",
        element: <Movie />
      },
      {
        path: "/tv/:id",
        element: <Tv />
      },
      {
        path: "/search/results",
        element: <Search />
      },
      {
        path: "/movies",
        element: <Movies />
      },
      {
        path: "/series",
        element: <Tvs />
      }

    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
