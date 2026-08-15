import { Navigate, Route, Routes } from 'react-router-dom'

import Login from '../components/auth/Login'
import Register from '../components/auth/Register'

import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Footer from '../components/Footer'

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </>
  )
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public application pages */}
      <Route path="/" element={<HomePage />} />

      {/* Authentication pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Unknown routes */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}

export default AppRoutes