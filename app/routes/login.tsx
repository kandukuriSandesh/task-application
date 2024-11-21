import React, { useState } from 'react'
import Layout  from './components/layout'
import Textfield from './components/textfield'
import { Link, useActionData } from '@remix-run/react'
import { ActionFunction, LoaderFunction } from '@remix-run/node'

export const meta:V2_MetaFunction = () =>{
    return [{title:"New Remix App Login"}]
}

export const loader:LoaderFunction = async ({request}) => {
    return ""
} 

export const action:ActionFunction = async ({request}) => {
    return ""
}

function Login() {
    const actionData = useActionData();
    const [formData,setFormData] = useState({
        email:actionData?.fields?.email || "",
        password:actionData?.fields?.password || "",
    })  

    const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, field:string) => {
        setFormData(state => ({...state,[field]:e.target.value}))
    }

  return (
    <div>
       <Layout>
         <div  className='h-full justify-center bg-yellow-100 items-center flex flex-col gap-y-5'>
            <form method='POST' className='rounded-2xl bg-white p-6 w-96' >
                <h2 className='text-3xl font-extrabold text-black mb-5' >
                  Login
                </h2>
                <Textfield
                htmlFor='email'
                label="Email"
                value={FormData.email}
                onChange={e => handleInputChange(e,"email")}
                />
                <Textfield
                htmlFor='password'
                label="Password"
                type='password'
                value={FormData.password}
                onChange={e => handleInputChange(e, "password")}
                />
                <div className='w-full text-center mt-5' >
                   <button type='submit' name='_action' className=' w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-100 ease-in-out hover:bg-red-600' >Login</button>
                </div>
                
            </form>
              <p className='text-gray-600' >
                Dont have an Account? <Link to={'/signup'}><span className=' text-red-600 px-2 underline' > Signup </span></Link>
              </p>
         </div>
       </Layout>
    </div>
  )
}

export default Login