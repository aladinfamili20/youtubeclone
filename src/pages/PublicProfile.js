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
    const {id} = useParams();
    const navigate = useNavigate();
    const [videoHistory, setVideoHistory] = useState([]);
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

      useEffect(() => {
        const fetchVideoHistory = async () => {
          try {
            const historyRef = collection(db, `users/${user.uid}/videoHistory`);
            const historySnapshot = await getDocs(historyRef);
            const historyDocuments = historySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setVideoHistory(historyDocuments);
           } catch (error) {
            console.error('Error fetching video history:', error);
          }
        };
      
        fetchVideoHistory();
      }, [user]); 
 
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
   {videoHistory && videoHistory.length > 0 ? (
    videoHistory.map((videoHist, index) => (
      <>
        <div className='secondaryVideoCon' key={index}>
          <Link to={`/videodetail/${videoHist.id}`}>
            <video width="350" height="200" className='playinVid'>
              <source src={videoHist.videoFile} type="video/mp4" />
            </video>
          </Link>
          <div className='secondTitle'>
            <p>{truncateString(videoHist.title, 50)} </p>
          </div>
          <div>
            <div className='secondaryVideoInfo'>
              <img
                src={videoHist.profPhoto}
                width={30}
                height={30}
                className='secondProfInfo'
                alt='secondaryVideoProfImg'
              />
              <div className='nameCont'>
                <h2>{videoHist.displayName}</h2>
                <div className='dateViews'>
                  <p>54 Views</p>
                  <p>{videoHist.postTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ))
  ) : (
    <p>No video history available</p>
  )}
</div>
    </div>
     
      
    {userProfVodeos && userProfVodeos.length > 0 ? (
  userProfVodeos.map((userData, index) => (
    <div className='historyContainer' key={index}>
      <h1>Your videos</h1>
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