'use client'

import { General, Props } from "@/types"
import { useEffect, useState } from "react";

interface DetailBaseStatsModalProps {
    stats: General["stats"];
    name: string;
} // Explicitly defining the properties
//  {

//     stats: General["stats"];
//     nam

// }


const DetailBaseStatsModal = ({ name, stats }: DetailBaseStatsModalProps) => {
    const [stat, setStat] = useState<Record<string, number>>({
        hp: 0,
        attack: 0,
        defense: 0,
        ['special-attack']: 0,
        ['special-defense']: 0,
        speed: 0,
        total: 0,
    });

    useEffect(() => {
        stats.forEach((stat) => {
            const statName = stat.stat.name
            const statValue = stat.base_stat
            setStat((prev) => ({
                ...prev,
                [statName]: statValue,
                total: prev.total + statValue
            }))
        })
    }, [])


    return (
        <div>
            <div className="flex gap-4 p-4 text-gray-500">
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
                <div className="flex flex-col gap-2 text-black">
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                    <div className="flex flex-col gap-2 w-100 bg-gray-200 rounded-full h-full my-2">
                        <div className="bg-green-400 h-full rounded-full" style={{ width: '60%' }} />
                    </div>
                </div>
            </div>
            <h1 className="flex font-bold text-black px-4">Type defenses</h1>
            <h3 className="text-gray-400 px-4">The effectiveness of each type on <span className="capitalize">{name}</span>.</h3>

        </div>
    )
}

export default DetailBaseStatsModal;
