'use client'
import { mmToFeetDecimalInches } from "@/lib/utils";
import { EggGroup, General, Species } from "@/types";
import convert from "convert-units";
import { use, useEffect, useState } from "react";
import { MdFemale, MdMale } from "react-icons/md";

type DetailAboutModalProps = {
    generalData: General;
    speciesData: Species;
}

const DetailAboutModal = ({ generalData, speciesData }: DetailAboutModalProps) => {
    if (!generalData || !speciesData) return null;
    const {
        abilities: pokemonAbilities,
        weight: pokemonWeight,
        height: pokemonHeight,
    } = generalData

    const {
        ['gender_rate']: pokemonGenderRate,
        genera: pokemonGenera,
        ['egg_groups']: pokemonEggGroups
    } = speciesData

    const [eggGroupsData, setEggGroupsData] = useState<EggGroup | null>(null)
    const [eggCycleData, setEggCycleData] = useState<EggGroup | null>(null)

    useEffect(() => {
        (async () => {
            const eggGroup = pokemonEggGroups[0]?.name;
            const eggCycle = pokemonEggGroups[1]?.name;
            const [eggGroupsRes, eggCycleRes] = await Promise.allSettled([
                fetch(`https://pokeapi.co/api/v2/egg-group/${eggGroup}`),
                fetch(`https://pokeapi.co/api/v2/egg-group/${eggCycle}`),
            ])

            if (eggGroupsRes.status !== "fulfilled") {
                throw new Error("Failed to fetch pokemon species data");
            }

            if (eggCycleRes.status !== "fulfilled") {
                throw new Error("Failed to fetch pokemon general data");
            }


            const eggGroupsJson: EggGroup = await eggGroupsRes.value.json();
            const eggCycleJson: EggGroup = await eggCycleRes.value.json();

            setEggGroupsData(eggGroupsJson)
            setEggCycleData(eggCycleJson)
        })()
    }, [])

    const eggGroupsEn = eggGroupsData?.names?.find((eggGroupObj) => eggGroupObj.language.name === 'en')?.name || "";
    const eggCycleEn = eggCycleData?.names?.find((eggGroupObj) => eggGroupObj.language.name === 'en')?.name || "";

    // // for testing
    // let readData = fs.readFileSync("db.json", "utf-8");
    // let data = JSON.parse(readData).data[name];
    // format response

    const abilities = pokemonAbilities?.map((ability: any) => ability.ability.name).join(", ");
    const formattedWeight = `${convert(pokemonWeight / 10).from('kg').to('lb').toFixed(1)} lbs (${convert(pokemonWeight / 10).from('kg').to('kg').toFixed(1)} kg)`;
    const formattedHeight = `${mmToFeetDecimalInches(pokemonHeight * 100, 1)} (${convert(pokemonHeight).from('mm').to('cm').toFixed(2)} m)`;
    const isGenderless = pokemonGenderRate === -1;
    const femalePercentage = pokemonGenderRate === -1 ? 0 : pokemonGenderRate * 100 / 8;
    const malePercentage = pokemonGenderRate === -1 ? 0 : 100 - femalePercentage;

    // Seed Pokémon
    const speciesPokemon = pokemonGenera?.find((genera: any) => genera.language.name === "en")?.genus || "Unknown";

    // remove Pokémon from speciesPokemon
    const species = (speciesPokemon.replace("Pokémon", "").trim());


    return (
        <div>
            <div className="flex gap-4 p-4 text-gray-500">
                <div className="flex flex-col gap-2 w-50">
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
                    </div>          </div>
                <div className="flex flex-col gap-2 text-black">
                    <div>{species}</div>
                    <div>{formattedHeight}</div>
                    <div>{formattedWeight}</div>
                    <div className="capitalize">{abilities}</div>
                </div>
            </div>
            <h1 className="flex font-bold text-black px-4">Breeding</h1>
            <div className="flex gap-4 p-4 text-gray-500 text">
                <div className="flex flex-col gap-2 w-50">
                    <div>
                        Gender
                    </div>
                    <div>
                        Egg Groups
                    </div>
                    <div>
                        Egg Cycle
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-black">
                    {
                        isGenderless
                            ? <div className="flex flex-row gap-4">Genderless</div>
                            : <div className="flex flex-row gap-4">
                                <span className="flex my-0 py-0"><MdMale className="m-auto text-blue-400" /> {malePercentage}%</span>
                                <span className="flex my-0 py-0"><MdFemale className="m-auto text-pink-400" /> {femalePercentage}%</span>
                            </div>
                    }
                    <div className="capitalize">{eggGroupsEn}</div>
                    <div className="capitalize">{eggCycleEn}</div>
                </div>
            </div>
        </div>
    )
}

export default DetailAboutModal;