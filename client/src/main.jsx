import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AddProduct from './pages/AddProduct.jsx'
import DeleteProduct from './pages/DeleteProduct.jsx'
import UpdateProduct from './pages/UpdateProduct.jsx'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inventory from './pages/inventory.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/inventory" element={<Inventory />} />
      <Route path="/add-product" element={<AddProduct/>} />
      <Route path="/delete-by-id" element={<DeleteProduct/>} />
      <Route path="/update-by-id" element={<UpdateProduct/>} />

    </Routes>
  </BrowserRouter>
  </React.StrictMode>,
)
