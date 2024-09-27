import React from 'react'
import AddTest from './components/AddTest'
import { Route, Routes } from 'react-router-dom'
import TestShowPage from './components/TestShowPage'
import Home from './pages/Home'
import Users from './components/Users'
import Books from './components/Books'

const App = () => {
  return (
    <div className=''>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/users' element={<Users />} /> 
        <Route path='/books' element={<Books />} /> 
        <Route path='/addTest' element={<AddTest />} /> 
        <Route path="/test" element={<TestShowPage />} />
      </Routes>
    </div>
  )
}

export default App