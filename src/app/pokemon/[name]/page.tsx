import fs from "fs";
import { typeColors, typeColorsLighter, typeColorsDarker } from "@/lib/typeColors";
import PokeballIcon from "@/components/PokeballIcon";
import convert from 'convert-units';

interface Props {
  params: {
    name: string;
  };
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;

  // // real API call
  // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // const data = await res.json();
  // // for testing
  let readData = fs.readFileSync("db.json", "utf-8");
  let data = JSON.parse(readData).data[name];
  // format response
  const formattedId = `#${data.id.toString().padStart(3, "0")}`;
  const pokemonType = data.types[0].type.name;
  const pokemonTypeSecondary = data.types[1]?.type.name;
  const color = typeColors[pokemonType] || "#fff"; // Fallback color if type is not found
  const colorLighter = typeColorsLighter[pokemonType] || "#fff"; // Fallback color if type is not found
  const colorDarker = typeColorsDarker[pokemonType] || "#fff"; // Fallback color if type is not found
  const abilities = data.abilities.map((ability: any) => ability.ability.name).join(", ");



  // Optionally fetch data here
  // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // const data = await res.json();



  return (
    <div
      style={{ backgroundColor: color }}
      className="text-white p shadow-md hover:shadow-lg transition"
    >
      <div className="container mx-auto p-4">
        <div className="text-right">{formattedId}</div>
        <h2 className="text-left capitalize font-semibold mt-2">{name}</h2>
        <div className="flex gap-2 mt-2 ">
          <div className="flex flex-1 gap-2">
            <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min h-min px-4 py-2">{pokemonType}</div>
            {pokemonTypeSecondary ? <div style={{ backgroundColor: colorLighter }} className="rounded-full capitalize text-center w-min h-min px-4 py-2">{pokemonTypeSecondary}</div> : null}
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
      <div className="modal rounded-tl-xl rounded-tr-xl bg-white text-black">
        <div className="nav flex justify-between items-center p-4">
          <div>About</div>
          <div>Base Stats</div>
          <div>Evolution</div>
          <div>Moves</div>
        </div>
        <div className="flex gap-4 p-4 text-gray-500">
          <div className="flex flex-col gap-2">
            <div>
              Species
            </div>
            <div>
              Height
            </div>
            <div>
              Weight
            </div>
            <div>
              Abilities
            </div>
          </div>
          <div className="flex flex-col gap-2 text-black">
            <div>Seed</div>
            <div>{convert(data.height).from('mm').to('cm')}</div>
            <div>{convert(data.weight/10).from('kg').to('lb').toFixed(1)} {data.weight/10} kg</div>
            <div className="capitalize">{abilities}</div>
          </div>
        </div>

      </div>
    </div>
  );
}
