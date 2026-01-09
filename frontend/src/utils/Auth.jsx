import React from 'react'

const isAuthenticated  = () => {
  return !!localStorage.getItem("token");
}

export default isAuthenticated;