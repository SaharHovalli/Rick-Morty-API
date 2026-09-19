import {allCharacters} from "../data/data" 
import "./App.css";
import Navbar from "./Components/Navbar";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";

function App(){
  return(
    <div className="app">
      <Navbar />
      <div className="main">
        <CharacterList allCharacters ={allCharacters} />
        <CharacterDetail/>
      </div>
    </div>
  ) 
}

export default App