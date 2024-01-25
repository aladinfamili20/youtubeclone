import React, { useEffect, useState } from 'react'
import '../Styles/Login.css'
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useNavigate} from 'react-router-dom'      
import {  GoogleAuthProvider,signInWithPopup, OAuthProvider } from "firebase/auth";
import { addDoc, doc } from 'firebase/firestore';
import { db } from '../data/firebase';
 
 const Login = ()=>{ 
    const navigate = useNavigate();
    // const [email, setEmail]=useState('')
    // const [password, setPassword]=useState('')   
    //  const onLogin =(e)=>{
    //   const auth = getAuth();
    //   e.preventDefault();
    //     signInWithEmailAndPassword(auth, email, password, )
    //   .then((userCredential) => {
    //      const user = userCredential.user;
    //     console.log(user)        
    //     navigate('/profile')
    //    })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage)
    //     alert('User not signed in, with correct credentials')
        
    //   })
    // }
  
    const handleSaveUser = async (user) => {
      const saveUserRef = doc(db, 'users', user.uid);
      try {
        await addDoc(saveUserRef, {
          userId: user.uid,
          displayName: user.displayName,
          email: user.email,
          profPhoto: user.photoURL,
        });
        console.log('User saved successfully', saveUserRef.id);
        // Handle successful user save (e.g., redirect to profile)
        // navigate('/profile');
      } catch (err) {
        console.log('Error logging in user', err);
        // Handle error (e.g., display an error message)
      }
    };



    const signWithGoogle = () => {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          handleSaveUser(user);
          // Redirect to the profile page or handle success accordingly
          // navigate('/profile');
        })
        .catch((error) => {
          console.log('Error', error);
          // Handle Google sign-in error (e.g., display an error message)
        });
    };
  
      return (
      <div className='loginMainContainer'>
        <section className='loginContainer'>        
        <div className='LoginInfo'>
                <h1>Log In</h1>
                <div className='LoginInfoConetents'>
      {/* <form> 
      <input type='email' value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email'
      className='LoginInput' 
      />
      <input type='password' value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='Password' className='LoginInput' 
        id='password'/>
      </form> */}
       
      {/* <button className='LoginButton'
      type='submit'
      onClick={onLogin}              
      >Log in</button>   
      <p>Or log in with:</p> */}
      <div className='ServiceLogins'>             
      <div>
      <div className='faceTweet'>
      <div 
        className='SocialButtons'
      onClick={signWithGoogle}> 
      <img src={require('../assets/Google.png')} alt='facebook logo'/>
      <h4> Continue with Google</h4>
      </div>
      {/* <div className='SocialButtons'
      onClick={loginWithYahoo}>
       <img src={require('../images/Logos/Yahoo.png')} alt='facebook logo'/>
       <h4> Continue with Yahoo</h4>
      </div> */}

      {/* <div className='SocialButtons'
      onClick={loginInWithFacebook}>
       <img src={require('../images/Logos/Facebook.png')} alt='facebook logo'/><h4> Continue with Facebook</h4>
      </div> */}

      {/* <div className='SocialButtons'
      onClick={loginWithTwitter}>
       <img src={require('../images/Logos/Twitter.png')} alt='facebook logo'/><h4> Continue with Twitter</h4>
      </div> */}
      </div>
      </div>  
       <div>      
      </div>     
      </div>              
      <small>Don't have account? <a href='/Signup' className='sgnupin'>Sign up</a></small>
   <div>
   <small>By signing up, you agree to our Terms, Data Policy and Cookies Policy.</small>  
   </div>
                </div>
             </div>
      </section>
        </div>
    )
      }



      // Sign in With Google

      
 
 export default Login