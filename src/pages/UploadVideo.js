import React, { useEffect, useState } from 'react'
import '../Styles/UploadVideo.css'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { auth, db, storage } from '../data/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
 const UploadVideo = () => {
    const {user} = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
    // const [displayName, setDisplayName] = useState(null)
    //  useEffect(()=>{
    //     onAuthStateChanged(auth, (user)=>{
    //         if(user){
    //             setDisplayName(displayName.user);
    //         }else{
    //             setDisplayName(null);
    //         }
    //     })
    //  })
console.log(user)
    const handleFileChange = async (event) => {
      try {
        const file = event.target.files[0];
        setVideoFile(file);
  
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setThumbnailUrl(e.target.result);
          };
          reader.readAsDataURL(file);
        } else {
          setThumbnailUrl(null);
        }
  
        const storageRef = ref(storage, `videos/${Date.now()}${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.log(error.message);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setVideoFile({ downloadURL });
           }
        );
      } catch (error) {
        console.error('Error handling file change:', error);
      }
    };
  
    const handleUpload = async () => {
        try {
           
          if (videoFile && videoFile.downloadURL) {
            const videoRef = await addDoc(collection(db, 'videos'), {
              displayName:user.displayName,
              title: title,
              videoFile: videoFile.downloadURL, 
              profPhoto:user.photoURL, 
               description: description,
              userId:user.uid
            });
            console.log('Video uploaded successfully with ID:', videoRef.id);
          }
        } catch (error) {
          console.error('Error uploading video to Firebase', error);
        }
      };
  
  return (
    <div>
        <div className='uploadContainer'>
            <input type='file'  accept="video/*" onChange={handleFileChange} />
            <div className='uploadVideoContainer'>
            {/* <img src={require('../assets/upload.png')}  width={200} height={300} className='uploadingvideo'alt='uploadvideosecton'/> 
            */}

{videoFile && (
  <video width="500" height="300" controls>
    <source src={videoFile.downloadURL || URL.createObjectURL(videoFile)} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
)}
                 
            <div className='titleContainer'>
               <input type='text' placeholder='Tile of the image' value={title} onChange={(e)=>setTitle(e.target.value)} className='videoTitle'/>
               <h2>Categoties</h2>            
               <div className='categories'>
                <h3>Comedy</h3>
                <h3>Sport</h3>
                <h3>Music</h3>
                <h3>Animation</h3>
                <h3>Movies</h3>
                <h3>Dance</h3>
               </div>
               <div className='categories'>
                <h3>Comedy</h3>
                <h3>Sport</h3>
                <h3>Music</h3>
                <h3>Animation</h3>
                <h3>Movies</h3>
                <h3>Dance</h3>               
               </div>
            </div>
            </div>
            <input type='text' placeholder='Tile of the image' value={description} onChange={(e)=>setDescription(e.target.value)} className='discription' />

            <div className='uploadVideo' onClick={handleUpload}>
                <h2>Upload Video</h2>
            </div>

        </div>
    </div>
  )
}

export default UploadVideo