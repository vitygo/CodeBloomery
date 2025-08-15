import React from 'react'
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage"
import UserMainPage from "./pages/UserMainPage"

function App() {

  return (
    <>
      <div className="min-h-screen w-full relative">
        {/* Light Blue Spots on White Background */}
        <div
          className="absolute inset-0 z-[-1]"
          style={{
            background: `
              radial-gradient(circle at 20% 30%, rgba(179, 229, 252, 0.4), transparent 25%),
              radial-gradient(circle at 70% 20%, rgba(179, 229, 252, 0.3), transparent 20%),
              radial-gradient(circle at 50% 70%, rgba(179, 229, 252, 0.35), transparent 30%),
              radial-gradient(circle at 80% 80%, rgba(179, 229, 252, 0.25), transparent 25%),
              linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%)
            `,
          }}
        />

        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/usermainpage' element={<UserMainPage/>} /> 
        </Routes>
      </div>
    </>
  )
}

export default App
