'use client'

import { pokeApiCall } from "@/lib/api";
import { Evolution, EvolutionRes } from "@/types"
import { useEffect, useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";

interface DetailEvolutionModalProps {
    evolutionChainId: string;
    color: {
        color: string;
        colorLighter: string;
        colorDarker: string;
    }
}

function parseChain(data: Evolution): Evolution {
    return {
        evolves_to: data.evolves_to.map(parseChain),
        species: {
            name: data.species.name,
            url: data.species.url,
        },
    };
}

const EvolutionNodeComponent: React.FC<{ node: Evolution, color: DetailEvolutionModalProps['color'], level: number }> = ({ node, color, level }) => {
    const getBackgroundColor = () => {
        if (level === 1) return color.colorLighter;
        if (level === 2) return color.color;
        return color.colorDarker;
    };

    return (
        <div className="flex flex-col items-center">
            <div className="p-3 text-gray-800 rounded-full text-center capitalize" style={{ backgroundColor: getBackgroundColor() }}>
                {node.species.name}
            </div>
            {node.evolves_to.length > 0 && (
                <>
                    <div className="mt-2">
                        <IoMdArrowDropdownCircle />
                    </div>
                    <div className="mt-4 flex space-x-4">
                        {node.evolves_to.map((child) => (
                            <EvolutionNodeComponent key={child.species.name} node={child} color={color} level={level + 1} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

const DetailEvolutionModal = ({ evolutionChainId, color }: DetailEvolutionModalProps) => {
    const [evoChain, setEvoChain] = useState<Evolution | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const evoRes = await pokeApiCall(`evolution-chain/${evolutionChainId}`);
                const evoJson: EvolutionRes = await evoRes.json();
                const parsed = parseChain(evoJson.chain);
                setEvoChain(parsed);
            } catch (error) {
                console.error("Error fetching evolution chain:", error);
            }
        })();
    }, [evolutionChainId]);

    return (
        <div className="gap-8 p-4 text-gray-500 h-100">
            {evoChain ? (
                <EvolutionNodeComponent node={evoChain} color={color} level={1} />
            ) : (
                <div className="loading-spinner h-20 w-20 mx-auto mt-10">
                    <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900"></div>
                    <p className="text-gray-500 text-center mt-2">Loading...</p>
                </div>
            )}
        </div>
    );
};

export default DetailEvolutionModal;
