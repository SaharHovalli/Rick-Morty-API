import { useEffect, useState } from "react";
import {allCharacters} from "../data/data" 
import "./App.css";
import Navbar from "./Components/Navbar";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";

function App(){
  const [characters , setCharacters]=useState([]);

useEffect(()=>{
  async function fetchData() {
  const res = await fetch ("https://rickandmortyapi.com/api/character")
  const data = await res.json();
  setCharacters(data.results)
  }
  fetchData()
} ,[] )



  return(
    <div className="app">
      <Navbar NumOfResult={characters.length}/>
      <Main characters={characters}>
           <CharacterList characters ={characters} />
           <CharacterDetail/>
        </Main>
    </div>
  );
}

export default App;

function Main({children}){
  return (
    <div className="main">
        {children}
    </div>
  )
}