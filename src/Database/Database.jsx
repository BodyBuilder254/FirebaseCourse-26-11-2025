
import {useState, useEffect} from "react";
import {getDocs, collection, addDoc, deleteDoc, doc} from "firebase/firestore";

import { database } from "../Config/firebase.js";
import styles from "./Database.module.css";

function Database(){

    const [movieList, setMovieList] = useState([]);
    const moviesCollection = collection(database, "movies");

    const[movieTitle, setMovieTitle] = useState("");
    const[releaseDate, setReleaseDate] = useState(new Date().getFullYear());
    const[receivedAward, setReceivedAward] = useState(false);
    
    async function getMovieList(){
        try{
            const data = await getDocs(moviesCollection);
            const filteredData = data.docs.map((doc)=> ({...doc.data(), id: doc.id}));
            setMovieList(filteredData);
        }catch(error){
            console.error(error);
        }
    }

    useEffect(()=>{
        getMovieList();
    }, []);

    async function onSubmitMovie(){
        
        try{
            await addDoc(moviesCollection, {title: movieTitle, releaseDate: releaseDate, receivedAward: receivedAward})
            getMovieList();
        }catch(error){
            console.error(error);
        }
    }

    async function deleteMovie(id){

        try{
            const movieDoc = doc(database, "movies", id);
            await deleteDoc(movieDoc);
        }catch(error){
            console.error(error);
        }
    }

    return(
        <div className={styles.myContainer} >
            <div className={styles.myInput} >
                <input value={movieTitle} onChange={(event)=> setMovieTitle(event.target.value)} placeholder="Enter Movie Title" type="text" />
                <input value={releaseDate} onChange={(event)=> setReleaseDate(parseInt(event.target.value))} type="number" min={1900} max={2100}/>
                <div><input checked={receivedAward} onChange={(event)=> setReceivedAward(event.target.checked)} type="checkbox" /><label>Received Award</label></div>
                <button onClick={onSubmitMovie} >Add Movie</button>       
            </div>
            {movieList.map((movie, index)=> <div key={index} className={styles.myDisplay} >
                <h1 style={{color: movie.receivedAward ? "green" : "red"}} >{movie.title}</h1> 
                <p>Date: {movie.releaseDate} </p>
                <button onClick={()=> deleteMovie(movie.id)} >Delete Movie</button>
            </div> )}
        </div>
    );
}

export default Database;
