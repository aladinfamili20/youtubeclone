// import React, { useEffect, useState } from 'react'
// import '../Styles/HomePage.css'
// import { collection, getDocs, query } from 'firebase/firestore';
// import { db } from '../data/firebase';
// import { IoThumbsDown, IoThumbsUp } from 'react-icons/io5';
// import { SlLike,SlDislike } from "react-icons/sl";
// import { Link } from 'react-router-dom';

// const HomePage = () => {
//     const [videoData, setVideoData] = useState([]);
//     const [loading, setLoading] = useState(null);

//     useEffect(() => {
//       const fetchVideo = async () => {
//         try {
//           const videoRef = collection(db, 'videos'); // Make sure to use the correct collection name
//           const querySnapshot = await getDocs(videoRef);
//           const videoDocuments = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setLoading(false);
//           setVideoData(videoDocuments);
//         } catch (error) {
//           console.error('Error fetching video data:', error);
//           setLoading(false);
//         }
//       };  
//       fetchVideo();
//     }, []); 

//     function truncateString(str, maxLength) {
//       if (str.length > maxLength) {
//           return str.substring(0, maxLength) + '...';
//       }
//       return str;
//   }
//   return (
//     <div>
//       <div className='homeContainer'>
//        <div  className='homeContainerGrid1' >
//         <div className='homeVidGrid2'>
 
//     {/* up next videos */}
//     {videoData.map((secondaryVideo, index) => {
//   return (
//     <div className='secondaryVideoCon' key={index}>
//       <Link to={`/videodetail/${secondaryVideo.id}`}>
//         <video width="350" height="200" className='playinVid' controls>
//           <source src={secondaryVideo.videoFile} type="video/mp4" />
//         </video>
//       </Link>
//       <div className='secondTitle'>
//         <p>{truncateString(secondaryVideo.title, 50)}</p>
        
//       </div>
//       <div>
//         <div className='secondaryVideoInfo'>
//           <img src={secondaryVideo.profPhoto} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg' />
//           <div className='nameCont'>
//             <h2>{secondaryVideo.displayName}</h2>
//             <div className='dateViews'>
//               <p>54 Views</p>
//               <p>1/20/2024</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// })}
//         </div>
        
       
//        </div>
//       </div>
//     </div>
//   )
// }

// export default HomePage





import React from 'react'

export const HomePage = () => {
  return (
    <div>HomePage</div>
  )
}

export default HomePage
