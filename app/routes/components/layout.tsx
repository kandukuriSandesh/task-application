import React from 'react'

function Layout({children}) {
  return (
    <div className='w-full h-screen bg-yellow-100' >
     {children}
    </div>
  )
}

export default Layout