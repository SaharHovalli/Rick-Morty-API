import { ArrowUpCircleIcon } from "@heroicons/react/24/outline"
import {allCharacters, episodes} from "../../data/data"
import { use, useEffect, useState } from "react"
import axios from "axios";
import Loader from "./Loader";
import {toast} from 'react-hot-toast'


export default function CharacterDetail({SelectedId}) {
const[character ,setcharacter]=useState(null);
const [isLoading,setisLoading]=useState(false);
const [episodes,setEpisodes]=useState([]);

useEffect(()=> {
  async function fetchData() {
    try {
      setisLoading(true);
      setcharacter(null);
    const{data}=await axios.get(
    `https://rickandmortyapi.com/api/character/${SelectedId}`
    );
    const episodesID = data.episode.map((e)=>e.split("/").at(-1));
    const{data:episodeData}=await axios.get(
    `https://rickandmortyapi.com/api/episode/${episodesID}`
    );
    setEpisodes([episodeData].flat());
    setcharacter(data);
  } catch(error){
    toast.error(error.response.data.error)
  }finally{
    setisLoading(false);
    } 
  }

 if(SelectedId)fetchData();
},[SelectedId]);

if(isLoading)
  return(
<div style={{flex:1}}>
 <Loader />
</div>
);

if(!character || !SelectedId)
  return (
<div style={{flex:1 , color:"var(--slate-300)"}}>
  Please Select a Character
</div>)




  return (
    <div style = {{flex:1}}>
      <div className="character-detail">
      <img src={character.image} alt={character.name} className="character-detail__img"/>
      <div className="character-detail__info">
        <h3 className="name">
          <span>{character.gender === "Male" ? "🙎🏻‍♂️" :"🙍🏻‍♀️"}</span>
          <span>&nbsp;{character.name}</span>
        </h3>
        <div className="info">
          <span className={`status ${character.status ==="Dead" ? "red":""}`}></span>
          <span>&nbsp;{character.status}</span>
          <span>-&nbsp;{character.species}</span>
        </div>
        <div className="location">
          <p>Last know location:</p>
          <p>{character.location.name}</p>
        </div>
        <div className="action">
          <button className="btn btn--primary">Add to favorite</button>
        </div>
      </div>
    </div>
    <div className="character-episode">
      <div className="character-episodes">
        <div className="title">
          <h2>List of Episodes:</h2>
          <button>
            <ArrowUpCircleIcon className="icon"/>
          </button>
        </div>
        <ul>
          {episodes.map((item,index)=>(
            <li key={item.id}>
              <div>
              {String(index + 1).padStart(2,"0")} {item.episode} : <strong>{item.name}</strong>
              </div>
              <div className=" "></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    
  )
}
