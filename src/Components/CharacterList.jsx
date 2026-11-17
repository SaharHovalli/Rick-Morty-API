
import { EyeIcon } from "@heroicons/react/24/outline";
import { EyeSlashIcon } from "@heroicons/react/16/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import Loader from "./Loader";

function CharacterList({
  SelectedId,
  characters,
  isLoading,
  onSelectCharacter,
  favorites,
  onAddFavorite
}) {
  if (isLoading)
    return (
      <div className="characters-list">
        <Loader />
      </div>
    );

  return (
    <div className="characters-list">
      {characters.map((item) => (
        <Character
          key={item.id}
          item={item}
          SelectedId={SelectedId}
          onSelectCharacter={onSelectCharacter}
          isFavorite={favorites.some((fav) => fav.id === item.id)}
          onAddFavorite={onAddFavorite}
        />
      ))}
    </div>
  );
}

export default CharacterList;

function Character({
  SelectedId,
  item,
  onSelectCharacter,
  isFavorite,
  onAddFavorite
}) {
  return (
    <div className="list__item">
      <img src={item.image} alt={item.name} />

      <CharacterName item={item} />
      <CharacterInfo item={item} />

      <div className="actions">
        <button
          className="icon red"
          onClick={() => onSelectCharacter(item.id)}
        >
          {SelectedId === item.id ? <EyeSlashIcon /> : <EyeIcon />}
        </button>

        <button
          className={`icon favorite-btn ${isFavorite ? "active" : ""}`}
          onClick={() => onAddFavorite(item)}
        >
          {isFavorite ? <HeartSolid /> : <HeartOutline />}
        </button>
      </div>
    </div>
  );
}

function CharacterName({ item }) {
  return (
    <h3 className="name">
      <span>{item.gender === "Male" ? "🙎🏻‍♂️" : "🙍🏻‍♀️"}</span>
      <span>{item.name}</span>
    </h3>
  );
}

function CharacterInfo({ item }) {
  return (
    <div className="list-item__info info">
      <span
        className={`status ${item.status === "Dead" ? "red" : ""}`}
      ></span>
      <span>{item.status}</span>
      <span> - {item.species}</span>
    </div>
  );
}
