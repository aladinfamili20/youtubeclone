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
    useEffect(()=>{
      onAuthStateChanged(auth, (user)=>{
        if(user){
          const uid = user.uid;
          const getUserHistory = async()=>{
            const getVideoHistoryRef = collection(db, 'videos');
            const querySnapshot = query(getVideoHistoryRef, where("userId", "==", uid))
            const snapshot  = await getDocs(querySnapshot);
            const userVidHistoryDocs = snapshot.docs.map((doc)=>(
              setUserVidHistory({
               Hours:doc.data().Hours,
                description:doc.data().description,
               displayName:doc.data().displayName,
               postTime:doc.data().postTime,
               profPhoto:doc.data().profPhoto,
               title:doc.data().title,
               userId:doc.data().userId,
               videoFile:doc.data().videoFile,
               viewCount:viewCount,
              })
            ))
          }
          getUserHistory();
        }
      })
    }) 
      const addVideoToHistory = async ({videoId}) => {
        try {
          const videoDocRef = doc(db, 'videos', videoId);
          await updateDoc(videoDocRef, {
            views: increment(1),
          });
          const historyRef = collection(db, `users/${user.uid}/videoHistory`);
          await addDoc(historyRef, {
            Hours:userVidHistory.Hours,
                description:userVidHistory.description,
               displayName:userVidHistory.displayName,
                postTime:userVidHistory.postTime,
               profPhoto:userVidHistory.profPhoto,
               title:userVidHistory.title,
               userId:userVidHistory.userId,
               videoFile:userVidHistory.videoFile,
              watchedAt: serverTimestamp(),
          });
          setViewCount((prevCount) => prevCount + 1);
    
        console.log('Video added to history with id',historyRef.id )
        } catch (error) {
          console.error('Error adding video to history:', error);
        }
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
      <span><p>Switch account</p></span>
      <span onClick={logoutUser}><b>Log out</b></span>
      </div>
        </div>          
      </div>
      <div className='historyContainer'>
  <h1>Your history</h1>
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
              <p>{`${userData.views || 0} Views`}</p>
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

export default Profile