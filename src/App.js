import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BanksPage from './pages/banks.page'
import ClientPage from './pages/clients.page'
import DashboardPage from './pages/dashboard.page'
import InvoicesPage from './pages/invoices.page'
import LoginPage from "./pages/login.page"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/banks" element={<BanksPage />} />
        <Route path="/clients" element={<ClientPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
