
import { useState, useEffect} from "react";
import styles from "./Auth.module.css";

import {auth, googleProvider} from "../Config/firebase.js";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";


function Auth(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL);
    useEffect(()=>{
        document.title = "Sign Up";
    }, []);

    async function emailSignIn(){
        if(email.length < 10 || email.length > 40){
            window.alert("Email must be 10 - 40 characters");
        }
        else if(!(email.includes("@") || email.includes("."))){
            window.alert("Invalid Email Address");
        }
        else if(auth.currentUser){
            window.alert("You are already signed in");
        }
        else{
            try{
                await createUserWithEmailAndPassword(auth, email, password);
            }catch(error){
                console.error(error);
            }
        }    
    }

    async function goggleSignIn(){
        if(auth.currentUser){
            window.alert("You are already signed in");
        }
        else{
            try{
                await signInWithPopup(auth, googleProvider);
            }catch(error){
                console.error(error);
            }
        } 
    }

    function handleSignOut(){
        if(!(auth.currentUser)){
            window.alert("You are not signed in");
        }
        try{
            signOut(auth);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={styles.myContainer} >
            <input placeholder="Enter Email" type="text" value={email} onChange={(event)=> setEmail(event.target.value)} /><br/>
            <input placeholder="Enter Password" type="password" value={password} onChange={(event)=> setPassword(event.target.value)} /><br/>
            
            <div className={styles.myControls} >
                <button onClick={emailSignIn}>Sign In</button>
                <button onClick={handleSignOut}>Sign Out</button>
                <button onClick={goggleSignIn} >Sign In With Google</button>
            </div>

        </div>
    );
}

export default Auth;
