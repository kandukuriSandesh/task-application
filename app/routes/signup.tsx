import React from 'react'
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

function signup() {
    const actionData = useActionData();
    const [formData,setFormData] = useState({
        email:actionData?.fields?.email || "",
        password:actionData?.fields?.password || "",
        name:actionData?.fields?.name || ""
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
             htmlFor='name'
             label="Name"
             type='name'
             value={FormData.name}
             onChange={e => handleInputChange(e, "name")}
             />
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
                <button type='submit' name='_action' className=' w-full rounded-xl mt-2 bg-red-500 px-3 py-2 text-white font-semibold transition duration-100 ease-in-out hover:bg-red-600' >Create an account</button>
             </div>
             
         </form>
           <p className='text-gray-600' >
             Already have an account? <Link to={'/login'}><span className=' text-red-600 px-2 underline' > Sign In </span></Link>
           </p>
      </div>
    </Layout>
 </div>
  )
}

export default signup