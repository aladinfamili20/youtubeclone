import React, { useEffect, useState } from 'react'
import '../Styles/UploadVideo.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import {  db, storage } from '../data/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuth } from '../auth/AuthContext';
import {  useNavigate } from 'react-router-dom';
   const UploadVideo = () => {
    const {user} = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [thumbnailUrl, setThumbnailUrl] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);
     const [uploadThum, setUploadThum] = useState('https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg');

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
          setUploadThum(URL.createObjectURL(file));

        } else {
          setThumbnailUrl(null);
          setUploadThum('https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg');

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
      }finally {
        // Reset upload progress when a new file is selected
        setUploadProgress(0);
      }
    };
  
    const handleUpload = async () => {
        try {
            const today = new Date();
            const date = today.toDateString();
            const Hours = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const time = today.toLocaleDateString();
          if (videoFile && videoFile.downloadURL) {
            const videoRef = await addDoc(collection(db, 'videos'), {
              displayName:user.displayName,
              title: title,
              videoFile: videoFile.downloadURL, 
              profPhoto:user.photoURL, 
              description: description,
              uploadedDate: date,
              postTime: time,
              Hours: Hours,              
              userId:user.uid
            });
            navigate('/')
            alert('Video uploaded successfully')
            console.log('Video uploaded successfully with ID:', videoRef.id);
          }
        } catch (error) {
          console.error('Error uploading video to Firebase', error);
        }
      };

  const File = ()=>{
    document.getElementById("fileuplaod").click();
    }
    const binaryData = []
    binaryData.push(videoFile)
    const blob = new Blob(binaryData, {type: "video/mp4"})
    const url = URL.createObjectURL(blob)

  const uploadThumnail = 'https://static.vecteezy.com/system/resources/previews/004/640/699/non_2x/circle-upload-icon-button-isolated-on-white-background-vector.jpg';

  return (
    <div>
        <div className='uploadContainer'>
            <input type='file' accept="video/*" onChange={handleFileChange} id='fileuplaod'  style={{display:'none'}} />
            <div className='uploadVideoContainer'>
            {/* <img src={require('../assets/upload.png')}  width={200} height={300} className='uploadingvideo'alt='uploadvideosecton'/> 
            */}

{videoFile && (
 
   <video width="500" height="300" controls>
    <source src={videoFile.downloadURL || URL.createObjectURL(videoFile)} type="video/mp4" />
   </video>
 
)}
 
 <img src={uploadThum} alt='' className='uploadThum' onClick={File}/>

  
            <div className='titleContainer'>
            <input type='text' placeholder='Title of the video' value={title} onChange={(e)=>setTitle(e.target.value)} className='videoTitle'/>
                
            </div>
            </div>
            <textarea type='text' placeholder='Description' value={description} onChange={(e)=>setDescription(e.target.value)} className='discription' >
             
            </textarea>
            {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}

            <div className='uploadVideoButton' onClick={handleUpload}>
                <h2>Upload Video</h2>
            </div>

        </div>
    </div>
  )
}

export default UploadVideo