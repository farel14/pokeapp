'use client'
import { typeColors, typeColorsLighter, typeColorsDarker } from "@/lib/constants";
import PokeballIcon from "@/components/PokeballIcon";
import { FaArrowLeftLong } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { General, GeneralSprites, Species } from "@/types";
import BackgroundIcon from "@/components/BackgroundIcon";
import { pokeApiCall } from "@/lib/api";
import DetailBaseStatsModal from "@/components/DetailBaseStatsModal";
import { use, useEffect, useState } from "react";
import DetailAboutModal from "@/components/DetailAboutModal";
import { useRouter } from "next/navigation";

type ActiveTabType = 'about' | 'stats' | 'evolution' | 'moves';
const tabs: ActiveTabType[] = ['about', 'stats', 'evolution', 'moves'];

// A mapping object that associates tab keys with their corresponding display names.
const tabsNameMapper: Record<ActiveTabType, string> = {
  about: 'About',
  stats: 'Base Stats',
  evolution: 'Evolution',
  moves: 'Moves',
};

const PokemonPage = ({ params }: { params: Promise<{ name: string }> }) => {
  const { name } = use(params);
  const router = useRouter();


  const [activeTab, setActiveTab] = useState<ActiveTabType>('about');

  const [pokemonType, setPokemonType] = useState("");
  const [pokemonTypeSecondary, setPokemonTypeSecondary] = useState("");
  const [color, setColor] = useState("");
  const [colorLighter, setColorLighter] = useState("");
  const [formattedId, setFormattedId] = useState("");
  const [pokemonSprites, setPokemonSprites] = useState<GeneralSprites | null>(null);
  const [generalData, setGeneralData] = useState<General | null>(null);
  const [speciesData, setSpeciesData] = useState<Species | null>(null);

  useEffect(() => {

    (async () => {

      // // real API call
      const [speciesRes, generalRes] = await Promise.allSettled([
        pokeApiCall(`pokemon-species/${name}`),
        pokeApiCall(`pokemon/${name}`),
      ]);

      if (speciesRes.status !== "fulfilled") {
        throw new Error("Failed to fetch pokemon species data");
      }

      if (generalRes.status !== "fulfilled") {
        throw new Error("Failed to fetch pokemon general data");
      }

      const speciesJson: Species = await speciesRes.value.json();
      const generalJson: General = await generalRes.value.json();

      setGeneralData(generalJson)
      setSpeciesData(speciesJson)

      const {
        id: pokemonId,
        types: pokemonTypes,
        sprites: pokemonSprites,
      } = generalJson
      setFormattedId(`#${pokemonId.toString().padStart(3, "0")}`);
      setPokemonType(pokemonTypes[0].type.name);
      setPokemonTypeSecondary(pokemonTypes[1]?.type.name);
      setColor(typeColors[pokemonTypes[0].type.name] || "#fff"); // Fallback color if type is not found
      setColorLighter(typeColorsLighter[pokemonTypes[0].type.name] || "#fff"); // Fallback color if type is not found
      setPokemonSprites(pokemonSprites)
    })();


  }, [])

  const renderTabContent = () => {
    if (!generalData || !speciesData) return null;

    switch (activeTab) {
      case 'about':
        return <DetailAboutModal generalData={generalData} speciesData={speciesData} />;
      case 'stats':
        return <DetailBaseStatsModal name={name} stats={generalData.stats} />;
      // case 'moves':
      //   return <MovesContent />;
      // case 'evolution':
      //   return <MovesContent />;
      default:
        return <div>Unknown tab</div>;
    }
  };

  return (
    (!generalData || !speciesData)
    ? 
      <div className="loader"></div>
    :
    <div
      style={{ backgroundColor: color }}
      className="grid text-white p shadow-md hover:shadow-lg transition h-screen"
    >
      <div className="container mx-auto px-4 font-bold py-0 my-0">
        <div className="flex justify-between mx-auto py-4">
          <FaArrowLeftLong className="cursor-pointer" onClick={() => router.back()} />
          <FaRegHeart />
        </div>
        <div className="flex justify-between">
          <h2 className="text-left capitalize font-bold text-2xl">{name}</h2>
          <div className="mt-4 text-sm font-bold">{formattedId}</div>
        </div>
        <div className="flex gap-2 mt-2 text-xs font-bold">
          <div className="flex flex-1 gap-2">
            <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min h-min px-5 py-1">{pokemonType}</div>
            {pokemonTypeSecondary ? <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min h-min px-5 py-1">{pokemonTypeSecondary}</div> : null}
          </div>

        </div>
        <div className="grid place-items-center mt-30">
          <img
            src={pokemonSprites?.other?.['official-artwork']?.front_default || pokemonSprites?.front_default}
            alt={name}
            className="z-20 top-0 size-50 object-cover"
          />
          <PokeballIcon className="z-0 size-50 ml-60 -mt-50" style={{ fill: colorLighter }} />
          <BackgroundIcon className="z-0 size-50 mr-20 -mt-50" style={{ fill: colorLighter }} />
        </div>

      </div>
      <div className="modal rounded-tl-xl rounded-tr-xl bg-white py-6 px-2 -mt-10 z-10">
        <div className="nav flex justify-between items-center p-4 text-gray-400">
          {
            tabs.map((tab) => (
              <div key={tab} className={`flex-1 cursor-pointer text-center border-b-2 p-2 ${activeTab === tab ? 'font-bold border-blue-700 text-black} p-2' : 'border-gray-200'}`} onClick={() => setActiveTab(tab)} role="tab">{tabsNameMapper[tab]}</div>
            ))
          }
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
}

export default PokemonPage;