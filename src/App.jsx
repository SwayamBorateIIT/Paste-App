
import "tailwindcss";
import './App.css'
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <div>
      <Navbar />
      <Home />

    </div>

  },

  {
    path: "/paste",
    element: 
    <div>
      <Navbar />
      <Paste />

    </div>

  },

  {
    path: "/paste/:id",
    element: 
    <div>
      <Navbar />
      <ViewPaste />

    </div>

  }
]);


function App() {
 

  return (
    <div className="App">
      <RouterProvider router={router} />
      {/* <Navbar />
      <Home /> */}
      {/* <Paste /> */}
      {/* <ViewPaste /> */}
      <ToastContainer />
    </div>
   
  )
}

export default App
