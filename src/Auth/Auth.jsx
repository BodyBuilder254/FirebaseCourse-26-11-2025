
import { useState} from "react";
import styles from "./Auth.module.css";

import {auth, googleProvider} from "../Config/firebase.js";
import {createUserWithEmailAndPassword, signInWithPopup, signOut} from "firebase/auth";


function Auth(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    console.log(auth?.currentUser?.photoURL);

    async function emailSignIn(){
        try{
            await createUserWithEmailAndPassword(auth, email, password);
        }catch(error){
            console.error(error);
        }
    }

    async function goggleSignIn(){
        try{
            await signInWithPopup(auth, googleProvider);
        }catch(error){
            console.error(error);
        }
    }

    function handleSignOut(){
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
            <button onClick={emailSignIn}>Sign In</button> <br/>
            <button onClick={handleSignOut}>Sign Out</button> <br/>

            <button onClick={goggleSignIn} >Sign In With Google</button>
        </div>
    );
}

export default Auth;
