export * from './eggGroups';
export * from './species';
export * from './general';
export * from './pokemonResponse';

// common interface
export interface Props {
    name: string
};

export interface ParamsProps {
    params: {
        name: string;
    };
}