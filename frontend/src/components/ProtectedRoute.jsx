import React from 'react'
import isAuthenticated from '../utils/Auth'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login"/>
}

export default ProtectedRoute