import Login from "./components/Login"

import { Routes, Route, Navigate } from "react-router-dom"
import SignUp from "./components/SignUp"
import Home from "./components/Home"
import { useState } from "react"
import RefreshHandler from "./components/RefreshHandler"

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
   const PrivateRoute = ({element})=>{
    return isAuthenticated ? element : <Navigate to='/login' />
   }
   
  return (
  <div>
    
    <div>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
    </div>
  
    <Routes>
        <Route path="/" element = {<Login />} />
      <Route path="/login" element = {<Login />} />
       <Route path="/signup" element = {<SignUp />} />
         <Route path="/home" element = {<PrivateRoute element={<Home/>} />} />
    </Routes>
 

   
  </div>
  )
}

export default App
