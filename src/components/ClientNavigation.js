import React from 'react'
import '../Styles/Navigation.css'
const ClientNavigation = () => {
  return (
    <div>
         <div className='naviContainer2'>
            <div>
                 <a href='/'>
                 <img src={require('../assets/Logo.png')} width={100} height={50} alt='logo'/> 
                </a>                    
            </div>
             <input type='text'  placeholder='Search for videos and creators' className='searchBar'/>
            <div className='clientNavLines'>
            <ul>                
                <li>
                    <a href='/login'>Sign in</a>
                </li>
            </ul>
            </div>
          </div>
    </div>
  )
}

export default ClientNavigation