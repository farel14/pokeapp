// src/app/pokemon/[name]/page.tsx

interface Props {
  params: {
    name: string;
  };
}

export default async function PokemonPage({ params }: Props) {
  const { name } = await params;

  // Optionally fetch data here
  // const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  // const data = await res.json();

  return (
    <div>
      <h1>Pokemon: {name}</h1>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
    </div>
  );
}
