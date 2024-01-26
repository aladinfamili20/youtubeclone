import React, { useEffect, useState } from 'react';
import { db } from '../data/firebase';
import { useParams } from 'react-router-dom';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import VideoFecthCollection from '../components/VideoFecthCollection';

const PublicProfile = () => {
  const { uid } = useParams();
  const { videoDocument } = VideoFecthCollection('videos', uid);
  const [userProfVideos, setUserProfVideos] = useState([]);
  const [getVideoDocs, setGetVideoDocs] = useState(null);

  useEffect(() => {
    setGetVideoDocs(videoDocument);
  }, [videoDocument]);

  useEffect(() => {
    const handleUserProfVideo = async () => {
      const timestamp = ('timestamp', 'desc');
      const profileRef = collection(db, 'videos');
      const querySnapshot = query(profileRef, where('userId', '==', uid), orderBy(timestamp));
      const snapshot = await getDocs(querySnapshot);
      const userDocuments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserProfVideos(userDocuments);
    };

    handleUserProfVideo();
  }, [uid]);

  return (
    <div className='profileContainer'>
      <div className='profileContainer1'>
        {/* Display user information based on the selected user's UID */}
        {/* You can add additional user details as needed */}
        <div className='profileConent'>
          <div className='ProfNameCon'>
            {/* Display user's profile picture, name, followers, etc. */}
            {/* Replace 'user' with the appropriate object containing the selected user's information */}
            <img src={user.photoURL} width={100} height={100} alt='profilePhoto' className='profPagePic' />
            <h2>{user.displayName}</h2>
            <div className='accountAction'>
              <span>
                <p>Followers</p>
              </span>
            </div>
          </div>
        </div>

        {getVideoDocs && getVideoDocs.length > 0 ? (
          getVideoDocs.map((userData, index) => (
            <div className='historyContainer' key={index}>
              <h1>Your videos</h1>
              {/* Display user's videos */}
              {/* Update the link to navigate to the appropriate video detail page */}
              <Link to={`/videodetail/${userData.id}`}>
                <video width='350' height='200' className='playinVid'>
                  <source src={userData.videoFile} type='video/mp4' />
                </video>
              </Link>
              <div className='secondTitle'>
                <p>{truncateString(userData.title, 50)}</p>
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
          ))
        ) : (
          <p>No videos available</p>
        )}
      </div>
    </div>
  );
};

export default PublicProfile;
