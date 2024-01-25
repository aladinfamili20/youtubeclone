import React, { useEffect, useState } from 'react'
import '../Styles/HomePage.css'
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, db } from '../data/firebase';
import { Link } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../auth/AuthContext';
 const HomePage = ({ match }) => {
  const userId = match?.params?.userId; // Use optional chaining to avoid the error
  const { user } = useAuth();
  const [videoData, setVideoData] = useState([]);
   const [userVidHistory, setUserVidHistory] = useState(null)
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
           videoFile:doc.data().videoFile
          })
        ))
      }
      getUserHistory();
    }
  })
})
 
  const addVideoToHistory = async () => {
    try {
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
    console.log('Video added to history with id',historyRef.id )
    } catch (error) {
      console.error('Error adding video to history:', error);
    }
  };
 
  function truncateString(str, maxLength) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength) + '...';
    }
    return str;
  }
 
  return (
    <div>
      <div className='homeContainer'>
       <div  className='homeContainerGrid1' >
        <div className='homeVidGrid2'>
     {videoData && videoData.length > 0 ? (
      videoData.map((secondaryVideo, index)=>(
        <>
        <div className='secondaryVideoCon' key={index}>
        <Link to={`/videodetail/${secondaryVideo.id}`} onClick={addVideoToHistory}  >
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
                <p>54 Views</p>
                <p>1/20/2024</p>
              </div>
            </div>
          </div>
          </Link>
        </div>
      </div>
        </>
      ))
    ) : (
      <p>No videos available at the moment</p>
    )}
  
       
  
        </div>
        
       
       </div>
      </div>
    </div>
  )
}

export default HomePage



// import React from 'react'

// const HomePage = () => {
//   return (
//     <div>HomePage</div>
//   )
// }

// export default HomePage

 