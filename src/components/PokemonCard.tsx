'use client'
import { typeColors, typeColorsLighter, typeColorsDarker } from "@/lib/constants";
import PokeballIcon from "@/components/PokeballIcon";
import { useEffect, useState } from "react";
import { pokeApiCall } from "@/lib/api";
import { useRouter } from "next/navigation";

const PokemonCard = ({ name }: any) => {
    const [pokemonData, setPokemonData] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const res = await pokeApiCall(`pokemon/${name}`);
            const data = await res.json();
            setPokemonData(data);
        })();
    }, [name]);

    if (!pokemonData) return null;

    // format response
    const formattedId = `#${pokemonData.id.toString().padStart(3, "0")}`;
    const pokemonType = pokemonData.types[0].type.name;
    const pokemonTypeSecondary = pokemonData.types[1]?.type.name;
    const color = typeColors[pokemonType] || "#fff"; // Fallback color if type is not found
    const colorLighter = typeColorsLighter[pokemonType] || "#fff"; // Fallback color if type is not found
    const colorDarker = typeColorsDarker[pokemonType] || "#fff"; // Fallback color if type is not found

    return (
        <div
            style={{ backgroundColor: color }}
            className="cursor-pointer text-white rounded-xl p-4 shadow-md hover:shadow-lg transition z-20"
            onClick={() => router.push(`/pokemon/${name}`)}
        >
            <div className="text-right" style={{ color: colorDarker }}>{formattedId}</div>
            <h2 className="text-left capitalize font-semibold mt-2">{name}</h2>
            <div className="flex gap-2 mt-2 ">
                <div className="flex flex-1 flex-col gap-2">
                    <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min px-4 py-2">{pokemonType}</div>
                    {pokemonTypeSecondary ? <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min px-4 py-2">{pokemonTypeSecondary}</div> : null}
                </div>
                <div className="relative gap-2 mt-2 ">
                    <PokeballIcon className="w-40 h-40" style={{ fill: colorLighter }} />
                    <img
                        src={pokemonData.sprites.other?.['official-artwork']?.front_default || pokemonData.sprites.front_default}
                        alt={name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
