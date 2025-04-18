// App.jsx

// importo bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// import degli elementi della libreria di gestione delle rotte
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'

// Layout
import DefaultLayout from "./layouts/DefaultLayout";

// Pages
import HomePage from "./pages/HomePage"
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />} >
          <Route index path="/" element={<HomePage />} />
          <Route path="/entrate" element={<IncomePage />} />
          <Route path="/uscite" element={<ExpensePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
