'use client'
import PokemonCard from "@/components/PokemonCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { pokeApiCallWithPage } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PokemonResponse } from "@/types";

const HomePage = () =>  {
  const [pokemons, setPokemons] = useState<PokemonResponse[] | null>(null);
  const router = useRouter();
  useEffect(() => {
    (async () => {
      const pokemonsRes = await pokeApiCallWithPage('pokemon');
      const pokemonsJson = await pokemonsRes.json();

      setPokemons(pokemonsJson.results);
    })();
    }, []);

  return (

    // home page react
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <FaArrowLeftLong className="text-2xl cursor-pointer" onClick={() => router.back()} />
        <TfiMenuAlt className="text-2xl" />
      </div>
      <h1 className="text-3xl font-bold mb-6">Pokedex</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pokemons && pokemons.map((pokemon) => (
          <PokemonCard key={pokemon.name} name={pokemon.name}/>
        ))}
      </div>
    </main>
  );
}

export default HomePage;
