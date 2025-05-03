import { useContext } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { Link } from "react-router-dom";

const Favorites = () => {
  const fav = JSON.parse(localStorage.getItem("favorites"));

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Favorite Pokemon
      </h1>

      {fav.length === 0 ? (
        <p className="text-center text-lg">No favorites yet.</p>
      ) : (
        <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
          {fav.map((poke) => (
            <Link key={poke.id} to={`/pokemon/${poke.id}`}>
              <div className="bg-[#3C3E44] p-4 rounded shadow">
                <img
                  src={poke.image}
                  alt={poke.name}
                  className="w-[150px] mx-auto"
                />
                <p className="text-center text-xl font-bold capitalize mt-2">
                  {poke.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
