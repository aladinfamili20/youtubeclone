import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Styles/Profile.css'
import { useAuth } from '../auth/AuthContext';
import '../Styles/HomePage.css'
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
  const Profile = () => {
    const {user} = useAuth();
    const {id} = useParams();
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


useEffect(()=>{
  onAuthStateChanged(auth, (user)=>{
    if(user){
      const uid = user.uid;
      const handleUserProfVideo = async()=>{
        const timestamp = ('timestamp', 'desc');
        const profileRef = collection(db, 'videos');
        const querySnapshot =   query(profileRef, where("userId", "==", uid));
        orderBy(timestamp) ;
        const snapshot =  await getDocs(querySnapshot);
        const userDocuments = snapshot.docs.map((doc)=>({
          id:doc.id,
          ...doc.data(),
        }))
        setUserProfVideos(userDocuments)
      }
      handleUserProfVideo();
    }
  })
})


  return (
    <div className='profileContainer'>
      {/* <div onClick={logoutUser}>
        <h1>Log out</h1>
    </div> */}
    <div className='profileContainer1'>
      <div className='profileConent'>
      <img src={user.photoURL} width={100} height={100} alt='profilePhoto' className='profPagePic'/>
      <div className='ProfNameCon'>
      <h2>{user.displayName}</h2>
      <p>Switch account</p>
      </div>
      {/* Profile history */}
       
      </div>
      <div className='historyContainer'>
        <h1>Your history</h1>
      <div className='secondaryVideoCon'  >
       <Link  >
        <img src='https://images.unsplash.com/photo-1705098277338-f17089115e03?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' width="350" height="200" className='playinVid'alt=''  />
           
 
       </Link>
       <div className='secondTitle'>
         <p>{truncateString(50)} Title of the video</p>
        
       </div>
       <div>
         <div className='secondaryVideoInfo'>
           <img src={user.photoURL} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg' />
           <div className='nameCont'>
             <h2>{user.displayName}</h2>
             <div className='dateViews'>
               <p>54 Views</p>
               <p>1/20/2024</p>
             </div>
           </div>
         </div>
       </div>
     </div>
      </div>
    </div>
     
      
      {userProfVodeos.map((userData, index)=>{
        return(
     
          <div className='historyContainer' key={index}>
        <h1>Your videos</h1>
      <div className='secondaryVideoCon' >
       <Link to={`/videodetail/${userData.id}`} >
       <video width="350" height="200" className='playinVid'  >
           <source src={userData.videoFile} type="video/mp4" />
       </video>
                   
       </Link>
       <div className='secondTitle'>
         <p>{ truncateString(userData.title, 50)} </p>        
       </div>
       <div>              
      
          <div className='secondaryVideoInfo'>
           <img src={userData.profPhoto} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg' />
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
     
        )
      })}
    </div>
  )
}

export default Profile