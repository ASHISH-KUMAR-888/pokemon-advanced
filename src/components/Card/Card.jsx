import { useContext, useRef, useState } from "react";
import { PokemonContext } from "../../context/PokemonContext";
import useFetchPokemon from "../../hooks/useFetchPokemon";
import useFilteredPokemon from "../../hooks/useFilteredPokemon";
import useAuraColor from "../../hooks/useAuraColor";
import { TYPES } from "../../utils/constants";
import { Link } from "react-router-dom";

const Card = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedType,
    setSelectedType,
    pre,
    nextt,
    setData,
  } = useContext(PokemonContext);
  const [uri, setUri] = useState("https://pokeapi.co/api/v2/pokemon");

  const { data, loading } = useFetchPokemon(uri);
  const { sortOption, setSortOption } = useContext(PokemonContext);
  const filteredData = useFilteredPokemon(
    data,
    searchTerm,
    selectedType,
    sortOption
  );
  const aura = useAuraColor();
  const { favorites, toggleFavorite } = useContext(PokemonContext);
  const { toggleCompare } = useContext(PokemonContext);

  const scroll = useRef(null);

  const [count, setCount] = useState(1);

  const next = () => {
    if (nextt != null) {
      setUri(nextt);
      setCount(count + 1);

      scroll.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const prev = () => {
    if (pre != null) {
      setUri(pre);

      setCount(count - 1);

      scroll.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="flex justify-center items-center gap-[25px] flex-wrap">
        <select
          className="bg-black text-white font-black px-[3px] py-[4px] cursor-pointer"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="id-asc">Sort by ID (Ascending)</option>
          <option value="id-desc">Sort by ID (Descending)</option>
          <option value="name-asc">Sort by Name (A-Z)</option>
          <option value="name-desc">Sort by Name (Z-A)</option>
        </select>

        <input
          className="search-OPtion"
          ref={scroll}
          type="text"
          placeholder="Search by Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
        />

        <select
          className="bg-black text-white font-black px-[3px] py-[4px] cursor-pointer"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">-- Select Type --</option>
          {TYPES.map((type) => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid mt-10 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6">
        {loading ? (
          <p
            style={{ filter: `drop-shadow(1px 1px 10px ${aura()})` }}
            className="text-white text-4xl text-center w-screen font-black"
          >
            Loading...
          </p>
        ) : filteredData.length > 0 ? (
          filteredData.map((poke, i) => (
            <div
              key={i}
              className="p-4 bg-[#3C3E44] rounded-md shadow-md relative"
            >
              <button
                onClick={() => toggleCompare(poke)}
                className=" text-white"
                title="Compare Pokemon"
              >
                <i className="fa-solid fa-scale-balanced"></i>
              </button>

              <button
                onClick={() => toggleFavorite(poke)}
                className="absolute top-[15px] right-[15px] z-40 cursor-pointer"
                title="Toggle Favorite"
              >
                {favorites.find((p) => p.id === poke.id) ? (
                  <i className="fa-solid fa-heart text-red-500"></i>
                ) : (
                  <i className="fa-regular fa-heart text-white"></i>
                )}
              </button>

              <Link to={`/pokemon/${poke.id}`} key={poke.id}>
                <img
                  src={poke.image}
                  alt={poke.name}
                  style={{ filter: `drop-shadow(1px 1px 10px ${aura()})` }}
                />

                <h2 className="text-white font-bold text-xl capitalize mt-2">
                  {poke.name}
                </h2>
                <p className="text-yellow-400">ID: {poke.id}</p>
                <p className="text-yellow-400">Height: {poke.height}</p>
                <p className="text-yellow-400">Weight: {poke.weight}</p>
                <p className="text-yellow-400">
                  Types: {poke.type.join(" | ")}
                </p>
                <p className="text-yellow-400">
                  Abilities: {poke.ability.join(" | ")}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p
            style={{ filter: `drop-shadow(1px 1px 10px ${aura()})` }}
            className="text-white text-center text-2xl w-screen font-black"
          >
            No Pokemon found.
          </p>
        )}
      </div>

      <div className="w-screen flex justify-center items-center gap-[20px] mt-[30px] mb-[30px] md:mb-[50px] md:mt-[50px] pagu">
        <button onClick={prev} style={{ opacity: count == 1 ? 0.3 : 1 }}>
          Previous
        </button>
        <p className="text-[28px] text-white font-bold">{count}</p>
        <button onClick={next} style={{ opacity: count == 194 ? 0.3 : 1 }}>
          Next
        </button>
      </div>
    </>
  );
};

export default Card;
