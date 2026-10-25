import { use, useEffect, useState } from "react";
import {allCharacters} from "../data/data" 
import "./App.css";
import Navbar from "./Components/Navbar";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import Loader from "./Components/Loader";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App(){
  const [characters , setCharacters]=useState([]);
  const [isLoading , setIsLoading]=useState(false);
  const [query , setQuery]=useState('');
  const [SelectedId,setSelectedId]=useState(null);


useEffect(() => {
  const timeout = setTimeout(() => {
    async function fetchData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/?name=${query}`
        );

        setCharacters(data.results);
      } catch (error) {
        if (error.response?.status === 404) {
          toast.error("No characters found!");
          setCharacters([]);
        } else {
          toast.error("Failed to fetch characters.");
          setCharacters([]);
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, 500);

  return () => clearTimeout(timeout);
}, [query]);



const handleSelectCharacter =(id)=>{
  setSelectedId(prevId => prevId ===id ? null:id);
};


  return(
    <div className="app">
    <Toaster />
      <Navbar NumOfResult={characters.length} query={query} setQuery={setQuery} />
      <Main>
     
           <CharacterList 
           SelectedId={SelectedId}
           characters ={characters} 
           isLoading={isLoading} 
           onSelectCharacter={handleSelectCharacter}/>
           <CharacterDetail SelectedId={SelectedId} />
          
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