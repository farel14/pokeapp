import { pokeApiCall } from '@/lib/api';
import { General, Props } from '@/types';
import { useEffect, useState } from 'react';

const TYPE_EFFECTIVENESS: Record<string, Record<string, number>> = {
  normal: { rock: 0.5, ghost: 0, steel: 0.5 },
  fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
  water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
  electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
  grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
  ice: { fire: 0.5, water: 0.5, grass: 2, ground: 2, flying: 2, dragon: 2, steel: 0.5 },
  fighting: { normal: 2, ice: 2, rock: 2, dark: 2, steel: 2, poison: 0.5, flying: 0.5, psychic: 0.5, bug: 0.5, ghost: 0, fairy: 0.5 },
  poison: { grass: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5, steel: 0, fairy: 2 },
  ground: { fire: 2, electric: 2, grass: 0.5, poison: 2, flying: 0, bug: 0.5, rock: 2, steel: 2 },
  flying: { electric: 0.5, grass: 2, fighting: 2, bug: 2, rock: 0.5, steel: 0.5 },
  psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0, steel: 0.5 },
  bug: { fire: 0.5, grass: 2, fighting: 0.5, poison: 0.5, flying: 0.5, psychic: 2, ghost: 0.5, dark: 2, steel: 0.5, fairy: 0.5 },
  rock: { fire: 2, ice: 2, fighting: 0.5, ground: 0.5, flying: 2, bug: 2, steel: 0.5 },
  ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
  dragon: { dragon: 2, steel: 0.5, fairy: 0 },
  dark: { fighting: 0.5, psychic: 2, ghost: 2, dark: 0.5, fairy: 0.5 },
  steel: { fire: 0.5, water: 0.5, electric: 0.5, ice: 2, rock: 2, fairy: 2, steel: 0.5 },
  fairy: { fire: 0.5, fighting: 2, poison: 0.5, dragon: 2, dark: 2, steel: 0.5 },
};

function getDefensiveMultipliers(types: string[]) {
  const allTypes = Object.keys(TYPE_EFFECTIVENESS);
  const multipliers: Record<string, number> = {};

  allTypes.forEach((attackType) => {
    let multiplier = 1;
    types.forEach((defType) => {
      const effectiveness = TYPE_EFFECTIVENESS[attackType]?.[defType] ?? 1;
      multiplier *= effectiveness;
    });
    multipliers[attackType] = multiplier;
  });

  return multipliers;
}

export default function DetailTypeModal({ name, generalData }: {name:string, generalData:General}) {
  const [defenseData, setDefenseData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      // const res = await pokeApiCall(`pokemon/${name}`);
      // const data = await res.json();
      const types = generalData.types.map(t => t.type.name);
      const multipliers = getDefensiveMultipliers(types);

      setDefenseData(multipliers);
    }

    fetchData();
  }, []);

  if (!defenseData) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg">
      <h1 className="flex font-bold text-black">Type defenses</h1>
      <h3 className="text-gray-400">The effectiveness of each type on <span className="capitalize">{name}</span>.</h3>

      <div className="grid grid-cols-2 gap-2 text-sm">
        {Object.entries(defenseData)
          .filter(([, val]) => val !== 1)
          .sort((a, b) => b[1] - a[1])
          .map(([type, value]) => (
            <div
              key={type}
              className={`flex items-center justify-between px-3 py-2 rounded 
                ${value > 1 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
            >
              <span className="capitalize">{type}</span>
              <span className="font-semibold">{value}×</span>
            </div>
          ))}
      </div>
    </div>
  );
}
