import React, { useEffect, useState } from 'react'
import '../Styles/UserNavigation.css'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../data/firebase';
import { useAuth } from '../auth/AuthContext';
import { IoAdd, IoAddCircleOutline, IoAddOutline, IoBasketSharp, IoLogOut } from 'react-icons/io5';
import { Link } from 'react-router-dom';

 const UserNavigation = () => {
  const {user} = useAuth();
  const [displayName, setDisplayName] = useState(null);
  useEffect(()=>{
    onAuthStateChanged(auth, (user)=>{
      if(user){
        setDisplayName(displayName);
      }else{
        setDisplayName(null)
      }
    })
  })
   return (
    <div>
         <div className='naviContainer1'>
            <div>
                 <a href='/'>
                 <img src={require('../assets/Logo.png')} width={100} height={50} alt='logo'/> 
                </a>                    
            </div>
             <input type='text'  placeholder='Search for videos and creators' className='searchBar'/>
            <div className='listC'>
              <div className='headerProfileDets'>
              <Link to={'/uploadvideo'}>
              <IoAddCircleOutline className='NavCartIcon'/>
              </Link>
                 <li>
                  <a href='/login'>Watching as: {user.displayName} </a>
                  <img src={user.photoURL}  alt='profileImage' className='profileImage'/>
                </li>
              </div>               
                
             </div>
          </div>
    </div>
  )
}

export default UserNavigation