import React from 'react'
import { Route, Routes } from 'react-router-dom'
import FoundationLayout from './FoundationLayout'

const FoundationRoutes = () => {
  return (
    <Routes>
        <Route path='layout' element={<FoundationLayout/>} />
    </Routes>
  )
}

export default FoundationRoutes