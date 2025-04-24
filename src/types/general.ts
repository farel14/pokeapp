export interface GeneralSprites {

    front_default: string
    other: {
        ['official-artwork']: {
            front_default: string
        }
    }
}

export interface General {
    id: number
    types: {
        slot: number
        type: {
            name: string
            url: string
        }
    }[];
    abilities: {
        ability: {
            name: string
            url: string
        }
    }[];
    sprites: GeneralSprites | null
    stats: {
        base_stat: number
        effort: number
        stat: {
            name: string
            url: string
        }
    }[]
    weight: number;
    height: number;
    moves: {
        move: {
            name: string
            url: string
        }
        version_group_details: {
            level_learned_at: number
            move_learn_method: {
                name: string
                url: string
            }
            version_group: {
                name: string
                url: string
            }
        }[]
    }[]
}