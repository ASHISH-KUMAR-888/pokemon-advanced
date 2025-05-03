import { createContext, useState, useEffect } from "react";

import { Navigate } from "react-router-dom";

export const PokemonContext = createContext();

export const PokemonProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("id-asc");
  const [pre, setPre] = useState("");
  const [nextt, setNextt] = useState("");
  const [data, setData] = useState([]);

  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (pokemon) => {
    setFavorites((prev) =>
      prev.find((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const [comparison, setComparison] = useState(() => {
    const stored2 = localStorage.getItem("comparison");
    return stored2 ? JSON.parse(stored2) : [];
  });

  useEffect(() => {
    localStorage.setItem("comparison", JSON.stringify(comparison));
  }, [comparison]);

  const toggleCompare = (pokemon) => {
    setComparison((prev) =>
      prev.find((p) => p.id === pokemon.id)
        ? prev.filter((p) => p.id !== pokemon.id)
        : [...prev, pokemon]
    );
  };

  const clearComparison = () => {
    setComparison([]);
    window.location.reload();
  };

  console.log(comparison);

  return (
    <PokemonContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        selectedType,
        setSelectedType,
        sortOption,
        setSortOption,
        favorites,
        toggleFavorite,
        pre,
        setPre,
        nextt,
        setNextt,
        data,
        setData,
        comparison,
        toggleCompare,
        clearComparison,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
