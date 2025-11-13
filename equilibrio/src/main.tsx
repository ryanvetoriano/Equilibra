import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import App from './App.tsx'
import './globals.css'
import Error from './routes/Error/Error.tsx';
import Login from './routes/Login/Login.tsx';
import Home from './routes/Home/Home.tsx';
import Register from './routes/Register/Register.tsx';

const router = createBrowserRouter([
  {path:"/", element: <App/>, errorElement:<Error/>, children:[
    {path:"/", element: <Login/>},
    {path:"/register", element: <Register/>},
    {path:"/home", element: <Home/>}
  ]}
]); 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)