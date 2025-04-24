export * from './eggGroups';
export * from './species';
export * from './general';
export * from './pokemonResponse';
export * from './evolution';

// common interface
export interface Props {
    name: string
};

export interface ParamsProps {
    params: {
        name: string;
    };
}