import { doc, getDoc } from 'firebase/firestore'
import  { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { useAuth } from '../auth/AuthContext'
 const UserFetchCollection = (collectionName, documentID) => {
    const [UserDocumments, setUserDocumments] = useState(null)
    const [loading, setLoading] = useState(null)
    const {user} = useAuth();
    const getUserDocumments = async()=>{
        const docRef = doc(db, collectionName, documentID);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            const obj = {
                id: documentID,
                user:user.uid,
                ...docSnap.data(),
            }
            setUserDocumments(obj);
            setLoading(false);
        }else{
            // alert('Video not found')
            console.log('Video not found')
        }
    };

    useEffect(()=>{
        getUserDocumments();
    })

    return {UserDocumments, loading}
}

export default UserFetchCollection