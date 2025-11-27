
import {useState, useEffect} from "react";
import {getDocs, collection, addDoc, deleteDoc,updateDoc, doc} from "firebase/firestore";

import { database, auth} from "../Config/firebase.js";
import styles from "./Database.module.css";

function Database(){

    const [movieList, setMovieList] = useState([]);
    const [updatedTitles, setUpdatedTitles] = useState({});
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
        document.title = "Movies";
        getMovieList();
    }, []);

    async function onSubmitMovie(){
        if(String(movieTitle).length < 5 || String(movieTitle).length > 20){
            window.alert("Title must be between 5 - 20 characters");
        }
        else if(String(releaseDate).length !== 4){
            window.alert("ENter Valid year !");
        }
        else{
            try{
                await addDoc(moviesCollection, {title: movieTitle, releaseDate: releaseDate, 
                    receivedAward: receivedAward, userId: auth.currentUser.uid})
                getMovieList();
                setMovieTitle("");
                setReceivedAward(false);
            }catch(error){
                console.error(error);
            }
        }  
    }

    async function deleteMovie(id){
        const confirm =window.confirm("Confrirm you want to delete the movie");
        if(confirm){
            try{
                const movieDoc = doc(database, "movies", id);
                await deleteDoc(movieDoc);
                getMovieList();
            }catch(error){
                console.error(error);
                window.alert("You must login first");
            }
        }
    }

    async function updateMovieTitle(id){
        if(!updatedTitles[id] || updatedTitles[id].length < 5){
            window.alert("Title must be atleast 5 characters");
        }
        else{
            const confirm = window.confirm("Are you sure to update the title");
            if(confirm){
                try{
                    const movieDoc = doc(database, "movies", id);
                    await updateDoc(movieDoc, {title: updatedTitles[id]});
                    getMovieList();
                    setUpdatedTitles(prev => ({...prev, [id]: ""}));
                }catch(error){
                    console.error(error);
                }
            }
        }
    }

    return(
        <div className={styles.myContainer} >
            <div className={styles.myInput} >
                <input value={movieTitle} onChange={(event)=> setMovieTitle(event.target.value)} placeholder="Enter Movie Title" type="text" />
                <input value={releaseDate} onChange={(event)=> setReleaseDate(event.target.value)} type="number" min={1900} max={2100}/>
                <div><input checked={receivedAward} onChange={(event)=> setReceivedAward(event.target.checked)} type="checkbox" /><label>Received Award</label></div>
                <button onClick={onSubmitMovie} >Add Movie</button>       
            </div>
            {movieList.map((movie, index)=> <div key={index} className={styles.myDisplay} >
                <h1 style={{color: movie.receivedAward ? "green" : "red"}} >{movie.title}</h1> 
                <p>Date: {movie.releaseDate} </p>
                <button onClick={()=> deleteMovie(movie.id)} >Delete Movie</button>
                <input type="text" value={updatedTitles[movie.id] || ""} placeholder="Updated Title" onChange={(event)=> setUpdatedTitles((prev)=> ({...prev, [movie.id]: event.target.value}))} />
                <button onClick={()=> updateMovieTitle(movie.id)} >Update Title</button>
            </div> )}
        </div>
    );
}

export default Database;
