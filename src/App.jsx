
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import Auth from "./Auth/Auth.jsx";
import Database from "./Database/Database.jsx";
import File from "./Files/File.jsx";

import styles from "./App.module.css";

function App(){

  return(

    <Router>
      <nav className={styles.myNav} >
        <Link to="/" >Home</Link>
        <Link to="/database" >Movies</Link>
        <Link to="/file">Pictures</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Auth/>} />
        <Route path="/database" element={<Database/>} />
        <Route path="/file" element={<File/>} />
      </Routes >
    </Router>
  );
}
export default App;
