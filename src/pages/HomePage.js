import React, { useEffect, useState } from 'react'
import '../Styles/HomePage.css'
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../data/firebase';
const HomePage = () => {
    const [videoData, setVideoData] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
      const fetchVideo = async () => {
        try {
          const videoRef = collection(db, 'videos'); // Make sure to use the correct collection name
          const querySnapshot = await getDocs(videoRef);
          const videoDocuments = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLoading(false);
          setVideoData(videoDocuments);
        } catch (error) {
          console.error('Error fetching video data:', error);
          setLoading(false);
        }
      };
  
      fetchVideo();
    }, []); 
  return (
    <div>
      <div className='homeContainer'>
       <div  className='homeContainerGrid1' >
        <div className='homeVidGrid2'>
        {/* <img src='https://images.unsplash.com/photo-1682685797208-c741d58c2eff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' alt='playingVideo' className='playinVid' width={1100} height={600}/> */}

        {videoData.map((videoFile, index) => (
              <video key={index} width="1100" height="600" className='playinVid' controls>
                <source src={videoFile.videoFile} type="video/mp4" />
              </video>
            ))}

        <div className='secondaryVideoCon'>
        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200}  />
        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />
        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />
        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />
        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />

        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />

        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />

        <img src='https://images.unsplash.com/photo-1682687220067-dced9a881b56?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8' alt='playingVideo' className='secondaryVid' width={350} height={200} />
        </div>
        </div>
       <div className='commentSection'>
        <h1>Comments</h1>
        <div className='homeProfPic'>
          <img src='https://images.unsplash.com/photo-1705582033498-e7384d494759?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D'  alt='userprofilepicture'/>
          <div className='commentCont'>
            <h2>Aladin Famili</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          </div>
        </div> 


        <div className='homeProfPic'>
          <img src='https://images.unsplash.com/photo-1705582033498-e7384d494759?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyM3x8fGVufDB8fHx8fA%3D%3D'  alt='userprofilepicture'/>
          <div className='commentCont'>
            <h2>Aladin Famili</h2>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
          </div>
        </div>
       </div>
       
       </div>
      </div>
    </div>
  )
}

export default HomePage