import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
    createBrowserRouter, RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import FixturePage from "./pages/FixturePage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/matches",
        element: <FixturePage/>
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
