import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { auth, db } from '../data/firebase';
import { Link, useNavigate, useParams } from 'react-router-dom';
import '../Styles/Profile.css'
import { useAuth } from '../auth/AuthContext';
import '../Styles/HomePage.css'
import { addDoc, collection, doc, getDocs, increment, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';

  const Profile = () => {
    const {user} = useAuth();
    const {id} = useParams();
    const navigate = useNavigate();
    const [videoHistory, setVideoHistory] = useState([]);
    const [userProfVodeos, setUserProfVideos] = useState([])
    const [userVidHistory, setUserVidHistory] = useState(null)
   const [viewCount, setViewCount] = useState(0);
   const [videoData, setVideoData] = useState([]);
   const [savedPosts, setSavedPosts] = useState([]);
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
        const fetchVideo = async () => {
          try {
            const videoRef = collection(db, 'videos');
            const querySnapshot = await getDocs(videoRef);
            const videoDocuments = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
             setVideoData(videoDocuments);
          } catch (error) {
            console.error('Error fetching video data:', error);
           }
        };
        fetchVideo();
      }, []);
     
      
 
 useEffect(() => {
    const retrieveSavedPosts = async () => {
      try {
        const userSavedPostsRef = collection(db, 'videos');
        const querySnapshot = await getDocs(
          query(userSavedPostsRef, where('saved_by_user', 'array-contains', user.uid))
        );

        const userSavedPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSavedPosts(userSavedPosts);
      } catch (error) {
        console.error('Error retrieving saved posts:', error);
      }
    };

    if (user) {
      retrieveSavedPosts();
    }
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
    
    <div className='profileContainer1'>
      <div className='profileConent'>
      <img src={user.photoURL} width={100} height={100} alt='profilePhoto' className='profPagePic'/>
      <div className='ProfNameCon'>
      <h2>{user.displayName}</h2>
      <div className='accountAction'>
      <span onClick={logoutUser}><p>Log out</p></span>
       </div>
        </div>          
      </div>
      <div className='historyContainer'>
    <div className=''>
          <h1>Your history</h1>
          <div className='watchedVideos'>
            {savedPosts.map((item) => (
              <React.Fragment key={item.id}>
                <div className='secondaryVideoCon'>
        <Link to={`/videodetail/${item.id}`}>
          <video width="350" height="200" className='playinVid'>
            <source src={item.videoFile} type="video/mp4" />
          </video>
        </Link>
        <div className='secondTitle'>
          <p>{truncateString(item.title, 50)} </p>
        </div>
        <div>
          <div className='secondaryVideoInfo'>
            <img
              src={item.profPhoto}
              width={30}
              height={30}
              className='secondProfInfo'
              alt='secondaryVideoProfImg'
            />
            <div className='nameCont'>
              <h2>{item.displayName}</h2>
              <div className='dateViews'>
              <p>{`${item.views || 0} Views`}</p>
                <p>{item.postTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
              </React.Fragment>
            ))}
          </div>
        </div>
</div>
    </div>
     
    <h1>Your videos</h1>

    {userProfVodeos && userProfVodeos.length > 0 ? (
              userProfVodeos.map((secondaryVideo, index) => (
                <div className='secondaryVideoCon' key={index}>
                  <Link to={`/videodetail/${secondaryVideo.id}`}  >
                    <video width="350" height="200" className='playinVid' controls>
                      <source src={secondaryVideo.videoFile} type="video/mp4" />
                    </video>
                  </Link>
                  <div className='secondTitle'>
                    <p>{truncateString(secondaryVideo.title, 50)}</p>
                  </div>
                  <div>
                    <Link to={`/vieworder/${secondaryVideo.userId}`} className='link'>
                      <div className='secondaryVideoInfo'>
                        <img src={secondaryVideo.profPhoto} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg' />
                        <div className='nameCont'>
                          <h2>{secondaryVideo.displayName}</h2>
                          <div className='dateViews'>
                            <p>{`${secondaryVideo.views || 0} Views`}</p>
                            <p>{secondaryVideo.postTime}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>You have no videos at the moment</p>
            )}

    </div>
  )
}

export default Profile