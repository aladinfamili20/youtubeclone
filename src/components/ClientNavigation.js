import React, { useState } from 'react'
import '../Styles/Navigation.css'
import { collection, getDocs, query, where, orderBy, startAfter, endBefore } from 'firebase/firestore';
import { IoAddCircleOutline, IoSearch,} from 'react-icons/io5';
import { db } from '../data/firebase';
 
const ClientNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setIsLoading] = useState(null)

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      
      // Perform a Firestore query to search for users
      const q = query(
        collection(db, 'videos'),
        where('displayName', '>=', searchQuery),
        where('displayName', '<=', searchQuery + '\uf8ff')
      );
      const querySnapshot = await getDocs(q);
  
      const results = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        results.push(user);
      });
  
      setSearchResults(results);
      setIsLoading(false);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };
  
  return (
    <div>
         <div className='naviContainer2'>
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
             <div className='serchedusers'>
             {searchResults.map((item) => (
        <React.Fragment key={item.userId || item.displayName || item.email }>
          <div className="searchInfo">
            <div>
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
             </div>
             
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