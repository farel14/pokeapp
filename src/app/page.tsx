import PokemonCard from "@/components/PokemonCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { useParams } from "next/navigation";

type PokemonListResult = {
  name: string;
  url: string;
};

async function getPokemons(limit = 20) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`);
  const data = await res.json();
  return data.results as PokemonListResult[];
}

export default async function HomePage() {
  const pokemons = await getPokemons();
  const params = useParams();
  const {name} = params;

  return (

    // home page react
    <main className="container mx-auto p-4">
      {name}
      <div className="flex justify-between items-center mb-6">
        <FaArrowLeftLong className="text-2xl" />
        <TfiMenuAlt className="text-2xl" />
      </div>
      <h1 className="text-3xl font-bold mb-6">Pokedex</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name} />
        ))}
      </div>
    </main>
  );
}
