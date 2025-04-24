export interface EggGroup {
    id: number;
    name: string;
    // names looks like this [{name:"かいじゅう", language: {name: "ja", url:"https://pokeapi.co/api/v2/language/1/"}}]
    names: {
        name: string;
        language: {
            name: string;
            url: string;
        };
    }[];
    pokemon_species: {
        name: string;
        url: string;
    }[];
}