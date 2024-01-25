import React, {  useState } from 'react'
import '../Styles/UserNavigation.css'
 import { db } from '../data/firebase';
import { useAuth } from '../auth/AuthContext';
import { IoAddCircleOutline, IoSearch,} from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';

 const UserNavigation = () => {
  const {user} = useAuth();  
  const uid = user.uid
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(null)
  const navigateToProfile = (uid) => {
    // Implement your navigation logic here
    console.log('Navigating to profile with UID:', uid);
  };
   const handleSearch = async () => {
    try {
      // Perform a Firestore query to search for users
      const q = query(collection(db, 'videos'), where('displayName',  '>=', searchQuery));
      const querySnapshot = await getDocs(q);

      const results = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        results.push(user);
      });

      setSearchResults(results);
      setIsLoading(false)
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }



   return (
    <div>
         <div className='naviContainer1'>
            <div>
                 <a href='/'>
                 <img src={require('../assets/Logo.png')} width={100} height={50} alt='logo'/> 
                </a>                    
            </div>
             <div className='searchMainContainer'>
             <div className='searchContainer'>
             <input type='text'  placeholder='Search for videos and creators' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} className='searchBar'/>
             <IoSearch onClick={handleSearch}  className='searchIcon'/>
             </div>
             {searchResults.map((item) => (
        <React.Fragment key={item.userId || item.displayName || item.email}>
          <div className="searchInfo">
            <div onClick={() => navigateToProfile(item.uid)}>
              <img src={item.profPhoto} className="profileImage" alt="Profileimg" />
            </div>
            <div>
              <p className="displayName">{item.displayName}</p>
             </div>
          </div>
          <div className="divider"></div>
        </React.Fragment>
      ))}
             </div>
            <div className='listC'>
              <div className='headerProfileDets'>
              <Link to={'/uploadvideo'}>
              <IoAddCircleOutline className='NavCartIcon'/>
              </Link>
                 <li>
                  <a href='/profile'>Watching as: {user.displayName} </a>
                  <img src={user.photoURL}  alt='profileImage' className='profileImage'/>
                </li>
              </div>               
                
             </div>
           
          </div>
    </div>
  )
}

export default UserNavigation