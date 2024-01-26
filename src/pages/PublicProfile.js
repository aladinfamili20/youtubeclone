import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Styles/Profile.css'
import { useAuth } from '../auth/AuthContext';
import '../Styles/HomePage.css'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
  const PublicProfile = () => {
    const {user} = useAuth();
    const {uid} = useParams();
    const navigate = useNavigate();
     const [userProfVodeos, setUserProfVideos] = useState([])
    const logoutUser = () => {
        signOut(auth)
          .then(() => {
             navigate("/");
          })
          .catch((error) => {
            console.log(error.message);
          });
      };
 
 
    function truncateString(str, maxLength) {
       if (str.length > maxLength) {
           return str.substring(0, maxLength) + '...';
       }
       return str;
   }
   useEffect(() => {
    const handleUserProfVideo = async () => {
      if (!uid) {
        // Handle the case where id is undefined (e.g., show an error message or redirect)
        return;
      }
  
      const profileRef = collection(db, 'videos');
      const querySnapshot = query(profileRef, where("userId", "==", uid));
      const timestamp = orderBy('timestamp', 'desc');
  
      try {
        const snapshot = await getDocs(querySnapshot);
        const userDocuments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUserProfVideos(userDocuments);
      } catch (error) {
        console.error("Error fetching user profile videos:", error);
        // Handle the error (e.g., show an error message)
      }
    };
  
    handleUserProfVideo();
  }, [uid]);
  
 
// Check if user is signed in
if (!user) {
  // Handle case when user is not signed in
  return <p>Please sign in to view video history</p>;
}
 

  return (
    <div className='profileContainer'>
      <div onClick={logoutUser}>
     </div>
    <div className='profileContainer1'>
      <div className='profileConent'>
      <img src={user.photoURL} width={100} height={100} alt='profilePhoto' className='profPagePic'/>
      <div className='ProfNameCon'>
      <h2>{user.displayName}</h2>
      <div className='accountAction'>
      <span><p>Followers</p></span>
       </div>
        </div>          
      </div>
      <div className='historyContainer'>
   
</div>
    </div>
     
      
    {userProfVodeos && userProfVodeos.length > 0 ? (
  userProfVodeos.map((userData, index) => (
    <div className='historyContainer' key={index}>
      <h1>Videos</h1>
      <div className='secondaryVideoCon'>
        <Link to={`/videodetail/${userData.id}`}>
          <video width="350" height="200" className='playinVid'>
            <source src={userData.videoFile} type="video/mp4" />
          </video>
        </Link>
        <div className='secondTitle'>
          <p>{truncateString(userData.title, 50)} </p>
        </div>
        <div>
          <div className='secondaryVideoInfo'>
            <img
              src={userData.profPhoto}
              width={30}
              height={30}
              className='secondProfInfo'
              alt='secondaryVideoProfImg'
            />
            <div className='nameCont'>
              <h2>{userData.displayName}</h2>
              <div className='dateViews'>
                <p>54 Views</p>
                <p>{userData.postTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
) : (
  <p>No videos available</p>
)}

    </div>
  )
}

export default PublicProfile