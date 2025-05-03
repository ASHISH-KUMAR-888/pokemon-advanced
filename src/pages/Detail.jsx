import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Detail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon({
          name: res.data.name,
          id: res.data.id,
          image: res.data.sprites.other.home.front_default,
          height: res.data.height,
          weight: res.data.weight,
          ability: res.data.abilities.map((ab) => ab.ability.name),
          type: res.data.types.map((ty) => ty.type.name),
          stats: res.data.stats.map((s) => ({
            name: s.stat.name,
            value: s.base_stat,
          })),
        });
      } catch (error) {
        console.error("Error fetching Pokémon:", error);
      }
      setLoading(false);
    };
    fetchPokemon();
  }, [id]);

  if (loading)
    return <p className="text-white text-2xl text-center">Loading...</p>;

  return (
    <div className="text-white p-8 max-w-3xl mx-auto">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="mx-auto w-[200px]"
      />
      <h1 className="text-4xl font-bold capitalize text-center mt-4">
        {pokemon.name}
      </h1>

      <div className="grid grid-cols-2 gap-4 mt-6 text-lg" key={pokemon.id}>
        <div>ID: {pokemon.id}</div>
        <div>Height: {pokemon.height}</div>
        <div>Weight: {pokemon.weight}</div>
        <div>Types: {pokemon.type.join(", ")}</div>
        <div className="col-span-2">
          Abilities: {pokemon.ability.join(", ")}
        </div>
        <div className="col-span-2">
          <p className="font-bold">Stats:</p>
          <ul>
            {pokemon.stats.map((stat) => (
              <li key={stat.name}>
                {stat.name}: {stat.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Detail;
