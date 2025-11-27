
import {useState } from "react";
import {storage} from "../Config/firebase.js";
import { ref, uploadBytes } from "firebase/storage";

import styles from "./File.module.css";

function File(){
    const [fileUpload, setFileUpload] = useState(null);

    async function uploadFile(){   
        if(!fileUpload || fileUpload == null){
            window.alert("Choose file please !");
        }
        else{
            const image = document.getElementById("image");
            image.src = URL.createObjectURL(fileUpload);
            
            const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
            try{
                await uploadBytes(filesFolderRef, fileUpload);
            }catch(error){
                console.error(error);
            }
        }
    }
    return(
        <div className={styles.myContainer} >
            <input type="file" onChange={(event)=> setFileUpload(event.target.files[0])} /> 
            <button onClick={uploadFile} >Upload File</button>
            <img id="image" src="" alt="Preview" />
        </div>
    );
}
export default File;
