import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer} from 'react-toastify'
import { handleError, handleSuccess } from '../utils'
import background from '../assets/background.jpg'
export default function SignUp() {
     
    const [logininfo, setLogininfo] = useState({
      
        email: "",
        password: ""
    })


   const navigate = useNavigate();
    const handleChange = async (e)=>{
          
        const {name, value} = e.target;

       const copyLoginInfo = {...logininfo}
       copyLoginInfo[name] = value;
       setLogininfo(copyLoginInfo);

    }
  console.log("login info", logininfo);
  
   const handleLogin = async(e)=>{
      e.preventDefault()
      const { email, password} = logininfo;
      if( !email || !password){
        return handleError("All fields are required")

      }
      try{
             const url = "authentication-hh69.vercel.app/auth/login"
             const response = await fetch(url, {
                method: "POST",
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(logininfo)

             })
             const result = await response.json();
             console.log(result);
             
             const {success,message,jwtToken, name, error} = result;
             if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken);
                localStorage.setItem('loggedInUser', name)
                
                setTimeout(()=>{
               navigate('/home')
                },1000)

             }else if(error){
                const details = error?.details[0].message;
                handleError(details)
             }else if(!success){
                handleError(message)
             }
             
             console.log(result);
             
      }
      catch(e){
            handleError(e)
      }
   }

  return (
    <div><section className="bg-gray-50 dark:bg-gray-900" style={{background: `url(${background})`}}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
   
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6  sm:p-8" style={{background: `url(${background})`}}>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                 Login into your account
              </h1>

              <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" action="#">
              

                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                      <input type="email" value={logininfo.email} onChange={handleChange} name="email" placeholder="name@gmail.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>

                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" value={logininfo.password}  onChange={handleChange} name="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>

                        <div className='flex items-center justify-center '>
                            <button className='bg-pink-500 w-24 h-8 text-white rounded'>Submit</button>
                        </div>
                  <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700  dark:focus:ring-primary-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">SignUp here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
<ToastContainer/>
</div>
  )
}
