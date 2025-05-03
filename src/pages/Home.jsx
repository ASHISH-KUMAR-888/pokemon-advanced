import Navbar from "../components/Navbar/Navbar";
import Card from "../components/Card/Card";
import { PokemonProvider } from "../context/PokemonContext";

const Home = () => {
  return (
    <>
     <PokemonProvider>
      <Navbar />
      <Card />
    </PokemonProvider>
    </>
  )
}

export default Home