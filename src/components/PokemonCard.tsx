import { typeColors, typeColorsLighter, typeColorsDarker } from "@/lib/typeColors";
import fs from 'fs';
import PokeballIcon from "@/components/PokeballIcon";


type Props = {
    name: string;
};

const PokemonCard = async ({ name }: Props) => {
    // // real API call
    // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    // const data = await res.json();
    // // for testing
    // let readData = fs.readFileSync('db.json', 'utf-8');
    // let parsedData = JSON.parse(readData);
    // if (!parsedData.data[name]) {
    //     parsedData.data[name] = data;
    //     fs.writeFileSync('db.json', JSON.stringify(parsedData, null, 2));
    // }
    let readData = fs.readFileSync('db.json', 'utf-8');
    let data = JSON.parse(readData).data[name];

    // format response
    const formattedId = `#${data.id.toString().padStart(3, "0")}`;
    const pokemonType = data.types[0].type.name;
    const pokemonTypeSecondary = data.types[1]?.type.name;
    const color = typeColors[pokemonType] || "#fff"; // Fallback color if type is not found
    const colorLighter = typeColorsLighter[pokemonType] || "#fff"; // Fallback color if type is not found
    const colorDarker = typeColorsDarker[pokemonType] || "#fff"; // Fallback color if type is not found

    return (
        <div
            style={{ backgroundColor: color }}
            className="text-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
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
                        src={data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default}
                        alt={name}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
                    />
                </div>
            </div>
        </div>
    );
};

export default PokemonCard;
