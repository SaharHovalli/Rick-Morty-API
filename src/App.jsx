import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { Favorite } from "./Components/Navbar";
import CharacterDetail from "./Components/CharacterDetail";
import CharacterList from "./Components/CharacterList";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function App(){
  const [characters , setCharacters]=useState([]);
  const [isLoading , setIsLoading]=useState(false);
  const [query , setQuery]=useState('');
  const [SelectedId,setSelectedId]=useState(null);
  const [favorites, setFavorites] = useState(() => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
});

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

useEffect(() => {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}, [favorites]);


const handleSelectCharacter =(id)=>{
  setSelectedId(prevId => prevId ===id ? null:id);
}; 

const handleonAddFavorite = (char) => {
  setFavorites((prevFav) =>
    prevFav.some((fav) => fav.id === char.id)
      ? prevFav.filter((fav) => fav.id !== char.id)
      : [...prevFav, char]
  );
};

const isAddToFavorite=favorites.map((fav)=> fav.id).includes(SelectedId);


  return(
    <div className="app">
    <Toaster />
      <Navbar 
      NumOfResult={characters.length}
       query={query}
        setQuery={setQuery}>
        <Favorite NumOfFaves={favorites.length}/>
        </Navbar> 
        
      <Main> 
        <CharacterList
  SelectedId={SelectedId}
  characters={characters}
  isLoading={isLoading}
  onSelectCharacter={handleSelectCharacter}
  favorites={favorites}
  onAddFavorite={handleonAddFavorite}
/>
           <CharacterDetail 
           SelectedId={SelectedId}
            onAddFavorite={handleonAddFavorite}
            isAddToFavorite={isAddToFavorite} />
          
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
