import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Main from "./layout/Main";
const Home = lazy(() => import("./pages/Home"));
const Favorite = lazy(() => import("./pages/Favorite"));
import WeatherProvider from './context/weather-context';
import UnitsProvider from './context/units-context';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main />
    ),
    children: [
      { index: true, element: <Suspense><Home /></Suspense> },
      { path: "/favorite", element: <Suspense><Favorite /></Suspense> },
    ],
  },
])

function App() {

  return (
    <UnitsProvider>
      <WeatherProvider>
        <RouterProvider router={router} />
      </WeatherProvider>
    </UnitsProvider>



  )
}

export default App
