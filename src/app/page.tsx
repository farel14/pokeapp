'use client'
import PokemonCard from "@/components/PokemonCard";
import { FaArrowLeftLong } from "react-icons/fa6";
import { TfiMenuAlt } from "react-icons/tfi";
import { pokeApiCallWithPage } from "@/lib/api";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PokemonResponse } from "@/types";
import InfiniteScroll from "react-infinite-scroll-component";
import PokeballIcon from "@/components/PokeballIcon";

const HomePage = () => {
  const router = useRouter();

  const [pokemons, setPokemons] = useState<PokemonResponse[] | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);


  const loadMorePokemons = async () => {
    const pokemonsRes = await pokeApiCallWithPage('pokemon', 20, page*20);
    const pokemonsJson = await pokemonsRes.json();

    if (!pokemonsJson.next || pokemonsJson.results.length === 0) {
      setHasMore(false);
      return;
    }

    setPokemons((prev) => [...(prev || []), ...pokemonsJson.results]);
    setPage((prev) => prev + 1);
  }


  useEffect(() => {
    loadMorePokemons();
  }, []);

  return (
    // home page react
    <main className="container mx-auto p-4">
      <div className="flex justify-between items-center z-20 h-20">
        <FaArrowLeftLong
          className="text-2xl cursor-pointer"
          onClick={() => router.back()}
        />
        
        <div className="relative w-56 h-56 flex items-center justify-center"> 
          <PokeballIcon className="absolute inset-0 z-10 ml-15 -mt-10 w-80 h-80 fill-gray-100" />
          <TfiMenuAlt className="z-30 text-3xl ml-50 cursor-pointer" />
        </div>
      </div>


      <h1 className="text-3xl font-bold mb-6">Pokedex</h1>
        <InfiniteScroll
          dataLength={pokemons ? pokemons.length : 0}
          next={loadMorePokemons}
          hasMore={hasMore}
          loader={<div className="loader"></div>}
          endMessage={<p className="text-center">No more pokemons</p>}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {pokemons && pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.name} name={pokemon.name} />
          ))}
        </InfiniteScroll>

    </main>
  );
}

export default HomePage;
