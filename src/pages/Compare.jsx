import { useContext, useEffect } from "react";
import { PokemonContext } from "../context/PokemonContext";
import { Link } from "react-router-dom";

const Compare = () => {
  const { clearComparison } = useContext(PokemonContext);

  const com = JSON.parse(localStorage.getItem("comparison"));

  return (
    <>
      <div className="text-white p-8 max-w-3xl mx-auto">
        <div className="p-6 text-white">
          <h1 className="text-3xl font-bold text-center mb-6">
            Your Comparison Pokemon
          </h1>
          <div className="flex justify-center items-center mb-[30px]">
            <button
              onClick={clearComparison}
              className="bg-[orange] text-black font-black py-[10px] px-[20px] rounded cursor-pointer"
            >
              Delete Comparison
            </button>
          </div>

          {com.length === 0 ? (
            <p className="text-center text-lg">No Comparison yet.</p>
          ) : (
            <div className="grid gap-[30px] md:grid-cols-2 lg:grid-cols-3">
              {com.map((poke) => (
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
      </div>
    </>
  );
};

export default Compare;
