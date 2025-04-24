'use client'

import { General } from "@/types"
import { useEffect, useState } from "react";

interface DetailBaseStatsModalProps {
    stats: General["stats"];
    name: string;
} // Explicitly defining the properties

const DetailBaseStatsModal = ({ stats }: DetailBaseStatsModalProps) => {
    const [stat, setStat] = useState<Record<string, number>>({
        hp: 0,
        attack: 0,
        defense: 0,
        ['special-attack']: 0,
        ['special-defense']: 0,
        speed: 0,
        total: 0,
    });
    const [statPercent, setStatPercent] = useState<Record<string, number>>({
        hp: 0,
        attack: 0,
        defense: 0,
        ['special-attack']: 0,
        ['special-defense']: 0,
        speed: 0,
    });
    const [statColor, setStatColor] = useState<Record<string, string>>({
        hp: '',
        attack: '',
        defense: '',
        ['special-attack']: '',
        ['special-defense']: '',
        speed: '',
    });

    useEffect(() => {
        const maxStat = Math.max(...stats.map(stat => stat.base_stat));
        const newStat: Record<string, number> = { hp: 0, attack: 0, defense: 0, ['special-attack']: 0, ['special-defense']: 0, speed: 0, total: 0 };
        const newStatPercent: Record<string, number> = { hp: 0, attack: 0, defense: 0, ['special-attack']: 0, ['special-defense']: 0, speed: 0 };
        const newStatColor: Record<string, string> = { hp: '', attack: '', defense: '', ['special-attack']: '', ['special-defense']: '', speed: '' };

        stats.forEach((stat) => {
            const statName = stat.stat.name;
            const statValue = stat.base_stat;
            newStat[statName] = statValue;
            newStat.total += statValue;
            newStatPercent[statName] = (statValue / maxStat) * 90;
            newStatColor[statName] = statValue >= (0.7 * maxStat) ? 'bg-green-400' : 'bg-red-400';
        });

        newStatPercent.total = 100;
        newStatColor.total = 'bg-yellow-400';

        // Set the state with the calculated values
        setStat(newStat);
        setStatPercent(newStatPercent);
        setStatColor(newStatColor);
    }, [stats]);

    if (!stat) return <p className="text-gray-500 load">Loading...</p>;


    return (
        <div>
            <div className="flex gap-4 p-4 text-gray-500 w-full">
                <div className="flex flex-col gap-2 w-30">
                    <div>
                        HP
                    </div>
                    <div>
                        Attack
                    </div>
                    <div>
                        Defense
                    </div>
                    <div>
                        Sp. Atk
                    </div>
                    <div>
                        Sp. Def
                    </div>
                    <div>
                        Speed
                    </div>
                    <div>
                        Total
                    </div>
                </div>
                <div className="flex flex-col gap-2 text-black">
                    <div>{stat.hp}</div>
                    <div>{stat.attack}</div>
                    <div>{stat.defense}</div>
                    <div>{stat['special-attack']}</div>
                    <div>{stat['special-defense']}</div>
                    <div>{stat.speed}</div>
                    <div>{stat.total}</div>
                </div>

                <div className="flex flex-col gap-2 text-black w-full">
                    {
                        Object.keys(stat).map((key) => (
                            <div key={key} className={`flex flex-col w-full gap-2 w-100 bg-gray-200 rounded-full h-full my-2`}>
                                <div className={`${statColor[key]} h-full rounded-full`} style={{ width: `${Math.floor(statPercent[key]) > 100 ? 100 : Math.floor(statPercent[key])}%` }} />
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailBaseStatsModal;
