import React from 'react'
import { Route } from 'react-router-dom'

const AppRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<IssueFeed />}/>
        <Route path='/login' element={<Login />}/>
    </Routes>
  )
}

export default AppRoutes