import { useMemo } from "react";


const useFilteredPokemon = (data, searchTerm, selectedType, sortOption) => {
  const filtered = useMemo(() => {
    return data.filter((pokemon) => {
      const matchName = pokemon.name.toLowerCase().includes(searchTerm);
      const matchType = selectedType ? pokemon.type.includes(selectedType) : true;
      return matchName && matchType;
    });
  }, [data, searchTerm, selectedType]);

  const sorted = useMemo(() => {
    const sortedData = [...filtered];
    switch (sortOption) {
      case "id-asc":
        return sortedData.sort((a, b) => a.id - b.id);
      case "id-desc":
        return sortedData.sort((a, b) => b.id - a.id);
      case "name-asc":
        return sortedData.sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return sortedData.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return sortedData;
    }
  }, [filtered, sortOption]);

  return sorted;
};

export default useFilteredPokemon;