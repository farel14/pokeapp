import Image from "next/image";
import { Heart, ArrowLeft, ListFilter } from "lucide-react";

const pokemons = [
  { id: 1, name: "Bulbasaur", types: ["Grass", "Poison"], color: "bg-green-200" },
  { id: 2, name: "Ivysaur", types: ["Grass", "Poison"], color: "bg-green-300" },
  { id: 3, name: "Venusaur", types: ["Grass", "Poison"], color: "bg-green-400" },
  { id: 4, name: "Charmander", types: ["Fire"], color: "bg-red-300" },
  { id: 5, name: "Charmeleon", types: ["Fire"], color: "bg-red-400" },
  { id: 6, name: "Charizard", types: ["Fire", "Flying"], color: "bg-red-500" },
  { id: 7, name: "Squirtle", types: ["Water"], color: "bg-blue-300" },
  { id: 8, name: "Wartortle", types: ["Water"], color: "bg-blue-400" },
  { id: 9, name: "Blastoise", types: ["Water"], color: "bg-blue-500" },
  { id: 25, name: "Pikachu", types: ["Electric"], color: "bg-yellow-300" },
];

interface PokemonCardProps {
  name: string;
  id: number;
  types: string[];
  color: string;
}

const PokemonCard = ({ name, id, types, color }: PokemonCardProps) => (
  <div className={`rounded-2xl p-3 text-white ${color}`}>
    <div className="flex justify-between">
      <span>#{String(id).padStart(3, "0")}</span>
    </div>
    <div className="font-bold text-lg">{name}</div>
    <div className="flex gap-1 text-sm">
      {types.map((t) => (
        <span key={t} className="bg-white bg-opacity-20 rounded px-2">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const PokedexPage = () => (
  <div className="min-h-screen bg-gray-50 p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Panel */}
      <div className="bg-white p-4 rounded-3xl shadow">
        <div className="flex justify-between items-center mb-4">
          <ArrowLeft />
          <h2 className="font-bold text-xl">Pokedex</h2>
          <ListFilter />
        </div>
        <div className="grid grid-cols-2 gap-4">
          {pokemons.map((p) => (
            <PokemonCard key={p.id} {...p} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default PokedexPage;