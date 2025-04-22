import { typeColors, typeColorsLighter, typeColorsDarker } from "@/lib/typeColors";
import fs from 'fs';

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
            <div style={{ color: colorDarker }}>{formattedId}</div>
            <h2 className="text-left capitalize font-semibold mt-2">{name}</h2>
            <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize">{pokemonType}</div>
            <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize">{pokemonTypeSecondary}</div>
            <img
            src={data.sprites.other?.['official-artwork']?.front_default || data.sprites.front_default}
            alt={name}
            className="w-20 h-20 mx-auto"
            />
        </div>
    );
};

export default PokemonCard;
