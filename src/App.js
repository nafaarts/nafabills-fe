import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import BanksPage from './pages/banks/banks.page'
import ClientPage from './pages/clients/clients.page'
import DashboardPage from './pages/dashboard/dashboard.page'
import { InvoicesPage } from './pages/invoices/invoices.page'
import LoginPage from "./pages/auth/login.page"
import InvoiceCreatePage from './pages/invoices/invoice-create.page'
import InvoiceDetail from './pages/invoices/invoice-detail.page'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/invoices" element={<InvoicesPage />} />
        <Route path="/invoice/create" element={<InvoiceCreatePage />} />
        <Route path="/invoice/:invoiceNumber/detail" element={<InvoiceDetail />} />
        <Route path="/banks" element={<BanksPage />} />
        <Route path="/clients" element={<ClientPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
