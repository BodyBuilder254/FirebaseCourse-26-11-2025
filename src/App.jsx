
import Auth from "./Auth/Auth.jsx";
import Database from "./Database/Database.jsx";

import styles from "./App.module.css";

function App(){

  return(
    <div className={styles.myDiv}>
      <Auth/>
      <Database/>
    </div>
  );
}
export default App;
