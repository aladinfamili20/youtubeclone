 import './App.css';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserNavigation from './components/UserNavigation';
import ClientNavigation from './components/ClientNavigation';
import LoginPage from './auth/LoginPage';
import { AuthContextProvider } from './auth/AuthContext';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './data/firebase';
import UploadVideo from './pages/UploadVideo';
 
function App() {
  const [user, setUser]= useState('')
  const [loading, setLoading] = useState(null)
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    })
    return ()=>{
    unsubscribe();
    }
  })
  return (
     <AuthContextProvider>
      <BrowserRouter>
     
     {!loading && user ?  <UserNavigation/>  :  <ClientNavigation/> }
      <Routes>
     <Route path="/" element={<HomePage />} />
     <Route path="/login" element={<LoginPage />} />
     <Route path="/uploadvideo" element={<UploadVideo />} />
     </Routes>
     </BrowserRouter>
     </AuthContextProvider>
  );
}

export default App;
