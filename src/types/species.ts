export interface Species {
    id: number
    gender_rate: number
    genera: {
        genus: string
        language: {
            name: string
            url: string
        }
    }[]
    egg_groups: {
        name: string
        url: string
    }[]
    evolution_chain: {
        url: string
    }
};