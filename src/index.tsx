import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FixturePage from "./pages/FixturePage";
import PositionsPage from './pages/PositionsPage';
import KnockoutPage from './pages/KnockoutPage';
import HallOfFamePage from './pages/HallOfFamePage';

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/matches",
        element: <FixturePage/>
    },
    {
        path: "/positions",
        element: <PositionsPage/>
    },
    {
        path: "/knockout",
        element: <KnockoutPage/>
    },
    {
        path: "/halloffame",
        element: <HallOfFamePage/>
    }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
      <RouterProvider router={router}/>
  </React.StrictMode>
);
