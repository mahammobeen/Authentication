import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'
import { ToastContainer } from 'react-toastify'
import background from '../assets/background.jpg'
export default function Home() {
  const [loggedInUser, setLoggedInUser] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
     setLoggedInUser(localStorage.getItem('loggedInUser'))
  },[])
  const handleLogout = (e)=>{
        localStorage.removeItem('token')
        localStorage.removeItem('loggedInUser')
        handleSuccess("User Logout")
        setTimeout(()=>{
          navigate('/login')
        },1000)
  }
  const fetchProducts = async()=>{
    try{

    }
    catch(e){
     handleError(e)
      
    }
  }
  useEffect(()=>{
      fetchProducts()
  },[])
  return (
 
     
    
      <div className='relative h-screen flex items-center justify-center' style={{background: `url(${background})`}}>
        <button className='absolute top-4 right-4 bg-pink-500 text-white px-3 py-1 rounded ' onClick={handleLogout}>Logout</button>
     
       <h1 className='text-6xl font-bold text-gray-800 '>Welcome Home {loggedInUser}</h1>
      <ToastContainer/>
    </div>
  )
}
