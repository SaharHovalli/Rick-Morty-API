
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { toast } from "react-hot-toast";

export default function CharacterDetail({
  SelectedId,
  onAddFavorite,
  isAddToFavorite,
}) {
  const [character, setCharacter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    if (!SelectedId) {
      setCharacter(null);
      setEpisodes([]);
      return;
    }

    const controller = new AbortController();

    async function fetchData() {
      try {
        setIsLoading(true);
        setCharacter(null);
        setEpisodes([]);

        const { data } = await axios.get(
          `https://rickandmortyapi.com/api/character/${SelectedId}`,
          { signal: controller.signal }
        );

        setCharacter(data);

        const episodesID = data.episode
          .slice(0, 5)
          .map((e) => e.split("/").at(-1));

        if (episodesID.length > 0) {
          const { data: episodeData } = await axios.get(
            `https://rickandmortyapi.com/api/episode/${episodesID.join(",")}`,
            { signal: controller.signal }
          );

          setEpisodes(
            Array.isArray(episodeData)
              ? episodeData
              : [episodeData]
          );
        }
      } catch (error) {
        if (
          error.code !== "ERR_CANCELED" &&
          !controller.signal.aborted
        ) {
          toast.error("Failed to fetch character!");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => controller.abort();
  }, [SelectedId]);

  if (isLoading)
    return (
      <div style={{ flex: 1 }}>
        <Loader />
      </div>
    );

  if (!character || !SelectedId)
    return (
      <div style={{ flex: 1, color: "var(--slate-300)" }}>
        Please Select a Character
      </div>
    );

  return (
    <div style={{ flex: 1 }}>
      <div className="character-detail">
        <img
          src={character.image}
          alt={character.name}
          className="character-detail__img"
        />

        <div className="character-detail__info">
          <h3 className="name">
            <span>
              {character.gender === "Male" ? "🙎🏻‍♂️" : "🙍🏻‍♀️"}
            </span>
            <span>&nbsp;{character.name}</span>
          </h3>

          <div className="info">
            <span
              className={`status ${
                character.status === "Dead" ? "red" : ""
              }`}
            ></span>
            <span>&nbsp;{character.status}</span>
            <span>-&nbsp;{character.species}</span>
          </div>

          <div className="location">
            <p>Last known location:</p>
            <p>{character.location.name}</p>
          </div>

<div className="action">
  <button
    onClick={() => onAddFavorite(character)}
    className="btn btn--primary"
  >
    {isAddToFavorite ? "Remove from favorites" : "Add to favorites"}
  </button>
</div>
        </div>
      </div>

      <div className="character-episode">
        <div className="character-episodes">
          <div className="title">
            <h2>List of Episodes:</h2>
            <button>
              <ArrowUpCircleIcon className="icon" />
            </button>
          </div>

          <ul>
            {episodes.map((item, index) => (
              <li key={item.id}>
                <div>
                  {String(index + 1).padStart(2, "0")}{" "}
                  {item.episode}: <strong>{item.name}</strong>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
