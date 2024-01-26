import { doc, getDoc } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../data/firebase'

const VideoFecthCollection = (collectionName, documentID) => {
    const [videoDocument, setVideoDocument] = useState(null)
    const [loading, setLoading] = useState(null)
    const getVideoDocument = async()=>{
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const obj = {
                id: documentID,
                ...docSnap.data(),
            }
            setVideoDocument(obj);
            setLoading(false);
        }else{
     
                // alert('Video not found')
                // console.log('Video not found')
        }
    };

    useEffect(()=>{
        getVideoDocument();
    })

    return {videoDocument, loading}
}

export default VideoFecthCollection