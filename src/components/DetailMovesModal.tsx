import { General } from '@/types';
import { useEffect, useState } from 'react';

interface MoveDetail {
    name: string;
    method: string;
    level: number;
}

export default function DetailMovesModal({ name, generalData }: { name: string, generalData: General }) {
    const [moves, setMoves] = useState<MoveDetail[]>([]);

    useEffect(() => {
        async function fetchMoves() {
            const moveList = generalData.moves.map(m => ({
                name: m.move.name,
                method: m.version_group_details[0]?.move_learn_method.name || 'unknown',
                level: m.version_group_details[0]?.level_learned_at || 0,
            })).sort((a, b) => a.level - b.level);
            setMoves(moveList);
        }

        fetchMoves();
    }, []);

    if (moves.length === 0) return <p className="text-gray-500 load">Loading...</p>;

    return (
        <>
            <h1 className="px-4 text-lg font-bold col-span-2 text-black">Moves</h1>
            <h3 className="px-4 text-gray-700 col-span-2">The moves that <span className="capitalize">{name}</span> can learn.</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 text-gray-500">

                {moves.map((move, index) => (
                    <div key={index} className="capitalize text-sm text-gray-500">
                        <p><strong>Move:</strong> {move.name}</p>
                        <p><strong>Method:</strong> {move.method}</p>
                        <p><strong>Level:</strong> {move.level}</p>
                    </div>
                ))}
            </div>
        </>
    );
}
