/* eslint-disable jsx-a11y/iframe-has-title */
// import React, { useEffect, useState } from 'react';
// import '../Styles/HomePage.css';
// import '../Styles/VideoDetails.css';
// import { arrayRemove, arrayUnion, collection, doc, getDoc, getDocs, query, updateDoc } from 'firebase/firestore';
// import { db } from '../data/firebase';
// import { SlLike, SlDislike } from 'react-icons/sl'; 
// import { useParams } from 'react-router-dom';
// import VideoFecthCollection from '../components/VideoFecthCollection';
// import {useAuth} from '../auth/AuthContext'

// const VideoDetail = () => {
//   const { id } = useParams();  
//   const { videoDocument, loading } =  VideoFecthCollection('videos', id);
//   const {user} = useAuth();
//   const uid = user.uid 
//   const [videoDataDet, setVideoDataDet] = useState();
//   const [secVideoLoading, setSecVideoLoading] = useState(null);
//   const [secondVideoData, setSecondVideoData] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [like, setLike] = useState([])
//   const [dislike, setDislike] = useState([])
//   const [comments, setComments] = useState([]);
//    const [commentData, setCommentData] = useState([]);
  
//   useEffect(() => {
//     setVideoDataDet(videoDocument);
//   }, [videoDocument]);

//   useEffect(() => {
//     const fetchingSecondVideo = async () => {
//       try {
//         const secondVidRef = collection(db, 'videos');
//         const querySnapshot = await getDocs(secondVidRef);
//         const secondVidDocuments = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setSecondVideoData(secondVidDocuments);
//         setSecVideoLoading(false);
//       } catch (error) {
//         // Handle error
//         console.log('Error fetching second videos', error);
//         setSecVideoLoading(false);
//       }
//     };

//     fetchingSecondVideo();
//   }, []);
 
//   function truncateString(str, maxLength) {
//     if (str.length > maxLength) {
//       return str.substring(0, maxLength) + '...';
//     }
//     return str;
//   }

//   const handleSecondaryVideoClick = (clickedVideo) => { 
//     setSelectedVideo(clickedVideo);
//   };

 
//   const handleLike = async () => {     
//     if (!uid) {
//       console.error('Current user email is undefined.');
//       return;}      
//     const currentLikeStatus = !videoDataDet.like || !videoDataDet.like.includes(uid);
//     const postRef = doc(db, 'videos', id);      
//     try {
//       await updateDoc(postRef, {
//         likes_by_user: currentLikeStatus
//           ? arrayUnion(uid)
//           : arrayRemove(uid),
//       });    
//       // Fetch the updated post data after the like operation
//       const updatedPostDoc = await getDoc(postRef);
//       const updatedPostData = updatedPostDoc.data();
  
//       if (updatedPostData) {
//         // Update the local state with the updated post data
//         setLike(updatedPostData);
//       }      
//       console.log('Video has been liked successfully by a user');
//     } catch (error) {
//       console.error('Error updating document', error);
//     }
//   }; 


//   // handling dislike button

//     const handleDislike = async()=>{
//       if(!uid){
//         console.log('User does not exist')
//         return;
//       }
//       const currentDislikeStatus = !videoDataDet.dislike || !videoDataDet.dislike.includes(uid);
//       const postDislikeRef = doc(db, 'videos', id);
//       try{
//         await updateDoc(postDislikeRef, {
//           dislike_by_users :currentDislikeStatus ?
//           arrayUnion(uid)
//           :
//           arrayRemove(uid),
//         })
//         const updateDislikeDoc = await getDoc(postDislikeRef) ;
//         const updatedDislikeData = updateDislikeDoc.data();

//         if(updatedDislikeData){
//           setDislike(updateDislikeDoc)
//         }
//         console.log('Video has been disliked successfully by a user');

//       } catch{
//         console.log('error disliking the video')
//       }
//     }


//     const handleComment = async () => {
//       const today = new Date();
//       const date = today.toDateString();
//       const Hours = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//       const time = today.toLocaleDateString();
//       const commentRef = doc(db, 'videos', id);
  
//       try {
//         await updateDoc(commentRef, {
//           comments: arrayUnion({
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//             comment: comments,
//             date: date,
//             Hours: Hours,
//             time: time,
//           }),
//         });
  
//         // Fetch updated comments
//         const updatedCommentDoc = await getDoc(commentRef);
//         const updatedCommentData = updatedCommentDoc.data();
  
//         if (updatedCommentData && updatedCommentData.comments) {
//           setCommentData(updatedCommentData.comments);
//         }
  
//         console.log('Comment added successfully');
//       } catch (error) {
//         console.log('Error commenting', error);
//       }
//     };
  
//     useEffect(() => {
//       const fetchComments = async () => {
//         const videoDocRef = doc(db, 'videos', id);
//         const videoDocSnapshot = await getDoc(videoDocRef);
  
//         if (videoDocSnapshot.exists()) {
//           const videoData = videoDocSnapshot.data();
//           if (videoData && videoData.comments) {
//             setCommentData(videoData.comments);
//           }
//         }
//       };
  
//       fetchComments();
//     }, [id]);
    

 
//   return (
//     <div>
//       <div className='homeContainer'>
//         <div className='homeContainerGrid1'>
//           <div className='homeVidGrid2'>
//             {/* Currently playing video */}
//             {selectedVideo ? (
//               <div>
//               <div>
//               <video width="1100" height="600" className='playinVid' controls src={selectedVideo.videoFile} type="video/mp4" /> 
//               {/* <img src={selectedVideo.image} width="1100" height="600" alt='' /> */}
//               </div>        
//             <div>
//           <h1>{truncateString(selectedVideo.title, 70)}</h1>                     
//         </div>  
//         <div className='payingVidContainer'>
//         <img src={selectedVideo.profPhoto} width={50} height={50} alt='profileimage' className='profImg'/>
//         <div className='playingVidNameCon'>
//           <h2>{selectedVideo.displayName}</h2>
//           <p>Jane Doe</p>
//         </div>
//         <div className='subs'>
//           <h2>Subscribe</h2>
//         </div>

//         <div className='likes'>
//        <div className='tumbsupCont' onClick={handleLike}>
//        <SlLike  className='tumbsup'/>
//          {/* <h2>{''}{selectedVideo.likes_by_user === 0}{''}</h2> */}
//        </div>

//        <div className='tumbsdownCont'>
//        <SlDislike  className='tumbsdown'/>
//          <h2>150</h2>
//        </div>
//       </div>        
//       </div>

//       <div className='desc'>
//         <p>
//           {videoDataDet.description}
//         </p>
//       </div>
//             </div>
//             ) : (
//               videoDataDet && (
//                 <div>
//                   <video width="1100" height="600" className='playinVid' controls>
//                     <source src={videoDataDet.videoFile} type="video/mp4" />
//                   </video>

//                   <div>
//                     <h1>{videoDataDet.title}</h1>
//                   </div> 
//                   <div className='payingVidContainer'>
//         <img src={videoDataDet.profPhoto} width={50} height={50} alt='profileimage' className='profImg'/>
//         <div className='playingVidNameCon'>
//           <h2>{videoDataDet.displayName}</h2>
//           <p>Jane Doe</p>
//         </div>
//         <div className='subs'>
//           <h2>Subscribe</h2>
//         </div>

//         <div className='likes'>
//         <div className='tumbsupCont' onClick={handleLike}>
//   <SlLike className='tumbsup' />
//   <h2>{videoDataDet.likes_by_user ? videoDataDet.likes_by_user.length : 0}</h2>
// </div>
//         <div className='tumbsdownCont' onClick={handleDislike}>
//        <SlDislike  className='tumbsdown'/>
//          <h2>{videoDataDet.dislike_by_users ? videoDataDet.dislike_by_users.length : 0}</h2>
//        </div>
//         </div>
//       </div>
//                 </div>
//               )
//             )}

//             {/* Up next videos */}
//             {/* {secondVideoData.map((secondVideo, index) => (
//               <div
//                 className='secondaryVideoCon'
//                 key={index}
//                 onClick={() => handleSecondaryVideoClick(secondVideo)}
//               >
//                 <video width="350" height="200" className='playinVid'  >
//                   <source src={secondVideo.videoFile} type="video/mp4" />
//                 </video>
//                 <div className='secondTitle'>
//                   <p>{truncateString(secondVideo.title, 40)}</p>
//                 </div>                 
//        <div>
//       <div className='secondaryVideoInfo'>
//         <img src={secondVideo.profPhoto} width={30} height={30} className='secondProfInfo' alt='secondaryVideoProfImg'/>
//         <div className='nameCont'>
//           <h2>{secondVideo.displayName}</h2>
//           <div className='dateViews'>
//             <p>54 Views</p>
//             <p>1/20/2024</p>
//           </div>
//         </div>
//       </div>
//     </div>
//               </div>
//             ))} */}
//           </div>

//           {/* Comment Section */}
//           <div className='commentSection'>
//   <h1>Comments</h1>
//   <div className='commentsContainer'>
//     <img src={user.photoURL} width={50} height={50} alt='' className='commentDisUrl' />
//     <textarea
//       type='text'
//       placeholder='Add a comment'
//       className='commentInput'
//       value={comments}
//       onChange={(e) => setComments(e.target.value)}
//     ></textarea>
//     <div onClick={handleComment}>
//       <h2>Comment</h2>
//     </div>
//   </div>

//   {commentData.map((comment, index) => (
//     <div key={index} className='homeProfPic'>
//       <img src={comment.photoURL} width={50} height={50} alt='userprofilepicture' />
//       <div className='commentCont'>
//         <h2>{comment.displayName}</h2>
//         <p>{comment.comment}</p>
//       </div>
//     </div>
//   ))}
// </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default VideoDetail;


import React from 'react'

const VideoDetail = () => {
  return (
    <div>VideoDetail</div>
  )
}

export default VideoDetail