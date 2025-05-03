import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { PokemonContext } from "../context/PokemonContext";


const useFetchPokemon = (uri) => {
  const [loading, setLoading] = useState(false);

    const { setPre, setNextt, data, setData } = useContext(PokemonContext);
  

  const fetchPokemons = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(uri);
      const results = res.data.results;

      setNextt(res.data.next);
      setPre(res.data.previous);

      const details = await Promise.allSettled(
        results.map(pokemon => axios.get(pokemon.url))
      );

      const formatted = details
        .filter(p => p.status === "fulfilled")
        .map(p => {
          const d = p.value.data;
          return {
            name: d.name,
            id: d.id,
            image: d.sprites.other.home.front_default,
            height: d.height,
            weight: d.weight,
            ability: d.abilities.map(ab => ab.ability.name),
            type: d.types.map(ty => ty.type.name)
          };
        });

      setData(formatted);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
    setLoading(false);
  }, [uri]);

  useEffect(() => {
    fetchPokemons();
  }, [fetchPokemons]);

  return { data, loading };
};

export default useFetchPokemon;