export interface EvolutionTo {
    evolution_details: []
    species: {
        name: string
        url: string
    }
    evolves_to: EvolutionTo[]
};

export interface EvolutionRes {
    chain: Evolution
};

export interface Evolution {
    evolves_to: EvolutionTo[];
    species: {
        name: string
        url: string
    }
};