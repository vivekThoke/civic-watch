import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import IssueFeed from '../pages/IssueFeed'
import IssueDetail from '../pages/IssueDetail'

const AppRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<IssueFeed />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/issues/:id' element={<IssueDetail />}/>
        </Routes>
    )
}

export default AppRoutes